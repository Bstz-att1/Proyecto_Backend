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
