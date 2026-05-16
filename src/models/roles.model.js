import pool from "../config/db.js";

export const RoleModel = {
  /**
   * Obtiene todos los roles.
   * @returns {Promise<Array<{id:number,name:string,description:string|null,created_at:Date}>>}
   */
  findAll: async () => {
    const [rows] = await pool.query(
      "SELECT id, name, description, created_at FROM roles ORDER BY id ASC"
    );
    return rows;
  },

  /**
   * Obtiene un rol por su ID.
   * @param {number} id - ID del rol.
   * @returns {Promise<{id:number,name:string,description:string|null,created_at:Date}|null>}
   */
  findById: async (id) => {
    const [rows] = await pool.query(
      "SELECT id, name, description, created_at FROM roles WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  },

  /**
   * Obtiene un rol por su nombre.
   * @param {string} name - Nombre del rol.
   * @returns {Promise<{id:number,name:string,description:string|null,created_at:Date}|null>}
   */
  findByName: async (name) => {
    const [rows] = await pool.query(
      "SELECT id, name, description, created_at FROM roles WHERE name = ?",
      [name]
    );
    return rows[0] || null;
  },

  /**
   * Obtiene permisos válidos por código.
   * @param {Array<string>} permissionCodes
   * @returns {Promise<Array<{id:number, code:string}>>}
   */
  findPermissionsByCodes: async (permissionCodes) => {
    if (!Array.isArray(permissionCodes) || permissionCodes.length === 0) {
      return [];
    }

    const placeholders = permissionCodes.map(() => "?").join(", ");
    const [rows] = await pool.query(
      `SELECT id, code FROM permissions WHERE code IN (${placeholders})`,
      permissionCodes
    );
    return rows;
  },

  /**
   * Crea un nuevo rol.
   * @param {{name:string, description?:string}} roleData
   * @returns {Promise<{id:number,name:string,description:string|null,created_at:Date}|null>}
   */
  create: async (roleData) => {
    const { name, description = null } = roleData;

    const [result] = await pool.query(
      "INSERT INTO roles (name, description) VALUES (?, ?)",
      [name, description]
    );

    return RoleModel.findById(result.insertId);
  },

  /**
   * Crea un rol y le asigna permisos en una transacción.
   * @param {{name:string, description?:string|null, permissions:Array<number>}} roleData
   * @returns {Promise<{id:number,name:string,description:string|null,created_at:Date}|null>}
   */
  createWithPermissions: async (roleData) => {
    const { name, description = null, permissions = [] } = roleData;
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      const [result] = await connection.query(
        "INSERT INTO roles (name, description) VALUES (?, ?)",
        [name, description]
      );

      const roleId = result.insertId;

      if (permissions.length > 0) {
        const values = permissions.map((permissionId) => [roleId, permissionId]);
        await connection.query(
          "INSERT INTO role_permissions (role_id, permission_id) VALUES ?",
          [values]
        );
      }

      await connection.commit();

      const [rows] = await pool.query(
        "SELECT id, name, description, created_at FROM roles WHERE id = ?",
        [roleId]
      );

      return rows[0] || null;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  /**
   * Actualiza completamente/parcialmente un rol por su ID.
   * @param {number} id
   * @param {{name?:string, description?:string}} roleData
   * @returns {Promise<{id:number,name:string,description:string|null,created_at:Date}|null>}
   */
  update: async (id, roleData) => {
    const fields = [];
    const values = [];

    if (Object.prototype.hasOwnProperty.call(roleData, "name")) {
      fields.push("name = ?");
      values.push(roleData.name);
    }

    if (Object.prototype.hasOwnProperty.call(roleData, "description")) {
      fields.push("description = ?");
      values.push(roleData.description);
    }

    if (fields.length === 0) {
      return RoleModel.findById(id);
    }

    values.push(id);

    const [result] = await pool.query(
      `UPDATE roles SET ${fields.join(", ")} WHERE id = ?`,
      values
    );

    if (result.affectedRows === 0) {
      return null;
    }

    return RoleModel.findById(id);
  },

  /**
   * Actualiza un rol y opcionalmente sincroniza sus permisos en una transacción.
   * @param {number} id
   * @param {{name?:string, description?:string, permissions?:Array<number>}} roleData
   * @returns {Promise<{id:number,name:string,description:string|null,created_at:Date}|null>}
   */
  updateWithPermissions: async (id, roleData) => {
    const { permissions, ...fieldsData } = roleData;
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      const updateFields = [];
      const updateValues = [];

      if (Object.prototype.hasOwnProperty.call(fieldsData, "name")) {
        updateFields.push("name = ?");
        updateValues.push(fieldsData.name);
      }

      if (Object.prototype.hasOwnProperty.call(fieldsData, "description")) {
        updateFields.push("description = ?");
        updateValues.push(fieldsData.description);
      }

      if (updateFields.length > 0) {
        updateValues.push(id);
        const [updateResult] = await connection.query(
          `UPDATE roles SET ${updateFields.join(", ")} WHERE id = ?`,
          updateValues
        );

        if (updateResult.affectedRows === 0) {
          await connection.rollback();
          return null;
        }
      } else {
        const [existingRows] = await connection.query(
          "SELECT id FROM roles WHERE id = ?",
          [id]
        );
        if (existingRows.length === 0) {
          await connection.rollback();
          return null;
        }
      }

      if (Array.isArray(permissions)) {
        await connection.query(
          "DELETE FROM role_permissions WHERE role_id = ?",
          [id]
        );

        if (permissions.length > 0) {
          const values = permissions.map((permissionId) => [id, permissionId]);
          await connection.query(
            "INSERT INTO role_permissions (role_id, permission_id) VALUES ?",
            [values]
          );
        }
      }

      await connection.commit();

      const [rows] = await pool.query(
        "SELECT id, name, description, created_at FROM roles WHERE id = ?",
        [id]
      );

      return rows[0] || null;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  /**
   * Elimina un rol por su ID.
   * @param {number} id
   * @returns {Promise<{id:number,name:string,description:string|null,created_at:Date}|null>}
   */
  delete: async (id) => {
    const role = await RoleModel.findById(id);

    if (!role) {
      return null;
    }

    const [result] = await pool.query("DELETE FROM roles WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return null;
    }

    return role;
  },

  /**
   * Obtiene los permisos asignados a un rol por su ID.
   * @param {number} roleId
   * @returns {Promise<Array<{id:number,code:string,description:string|null}>>}
   */
  findPermissionsByRoleId: async (roleId) => {
    const [rows] = await pool.query(
      `
      SELECT p.id, p.code, p.description
      FROM role_permissions rp
      INNER JOIN permissions p ON p.id = rp.permission_id
      WHERE rp.role_id = ?
      ORDER BY p.code ASC
      `,
      [roleId]
    );

    return rows;
  },

  /**
   * Obtiene los permisos asignados a un usuario por medio de sus roles.
   * Retorna objetos con código y descripción para documentar alcance funcional del permiso.
   * @param {number} userId - ID del usuario.
   * @returns {Promise<Array<{code:string, description:string}>>}
   */
  getPermissionsByUserId: async (userId) => {
    const [rows] = await pool.query(
      `
      SELECT DISTINCT p.code, p.description
      FROM users u
      INNER JOIN user_roles ur ON ur.user_id = u.id
      INNER JOIN roles r ON r.id = ur.role_id
      INNER JOIN role_permissions rp ON rp.role_id = r.id
      INNER JOIN permissions p ON p.id = rp.permission_id
      WHERE u.id = ?
      ORDER BY p.code ASC
      `,
      [userId]
    );

    return rows
      .filter((row) => typeof row.code === "string" && row.code.trim() !== "")
      .map((row) => ({
        code: row.code,
        description: row.description ?? "",
      }));
  },
};
