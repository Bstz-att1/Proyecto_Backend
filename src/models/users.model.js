import pool from "../config/db.js";

export const UserModel = {
  // 1. Obtener todos los usuarios (Excluimos datos sensibles)
  getAll: async () => {
    const [users] = await pool.query(`
      SELECT 
        u.id,
        u.name,
        u.document,
        u.email,
        u.created_at,
        r.name AS role
      FROM users u
      LEFT JOIN user_roles ur ON ur.user_id = u.id
      LEFT JOIN roles r ON r.id = ur.role_id
      ORDER BY u.id ASC
    `);
    return users;
  },

  // 2. Obtener un usuario por ID
  findById: async (id) => {
    const [user] = await pool.query(`
      SELECT 
        u.id,
        u.name,
        u.document,
        u.email,
        r.name AS role
      FROM users u
      LEFT JOIN user_roles ur ON ur.user_id = u.id
      LEFT JOIN roles r ON r.id = ur.role_id
      WHERE u.id = ?
    `, [id]);
    return user[0] || null;
  },

  // 3. Obtener usuario por documento (Para el LOGIN: aquí SÍ necesitamos el password_hash)
  findByDocument: async (document) => {
    const [user] = await pool.query(
      "SELECT id, name, document, email, password_hash, token_version FROM users WHERE document = ?", 
      [document]
    );
    return user[0] || null;
  },

  // 3.1 Obtener usuario por ID (incluye token_version para validación de sesión)
  findByIdWithTokenVersion: async (id) => {
    const [rows] = await pool.query(
      "SELECT id, name, document, email, token_version FROM users WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  },

  // 4. Actualizar usuario
  update: async (id, data) => {
    const {
      role,
      password,
      password_hash,
      ...userFields
    } = data || {};

    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      const updatePayload = { ...userFields };

      if (password_hash) {
        updatePayload.password_hash = password_hash;
      }

      if (password && !password_hash) {
        updatePayload.password_hash = password;
      }

      if (Object.keys(updatePayload).length > 0) {
        const [result] = await connection.query("UPDATE users SET ? WHERE id = ?", [updatePayload, id]);

        if (result.affectedRows === 0) {
          await connection.rollback();
          return null;
        }
      } else {
        const [existingRows] = await connection.query("SELECT id FROM users WHERE id = ?", [id]);
        if (existingRows.length === 0) {
          await connection.rollback();
          return null;
        }
      }

      if (role) {
        const [roleRows] = await connection.query(
          "SELECT id FROM roles WHERE name = ?",
          [String(role).trim().toUpperCase()]
        );

        if (roleRows.length === 0) {
          await connection.rollback();
          return null;
        }

        const newRoleId = roleRows[0].id;

        await connection.query("DELETE FROM user_roles WHERE user_id = ?", [id]);
        await connection.query(
          "INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)",
          [id, newRoleId]
        );
      }

      await connection.commit();
      return await UserModel.findById(id);
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  // 5. Eliminar usuario
  delete: async (id) => {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows > 0;
  },

  // 6. Crear un nuevo usuario + asignar rol
  create: async (newUser) => {
    const { name, document, email, password_hash, role_id } = newUser;
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      const [result] = await connection.query(
        "INSERT INTO users (name, document, email, password_hash) VALUES (?, ?, ?, ?)",
        [name, document, email, password_hash]
      );

      await connection.query(
        "INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)",
        [result.insertId, role_id]
      );

      await connection.commit();
      return await UserModel.findById(result.insertId);
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  // 7. Actualizar refresh_token
  updateRefreshToken: async (userId, refresh_token) => {
    await pool.query("UPDATE users SET refresh_token = ? WHERE id = ?",
      [refresh_token, userId]
    );
  },

  // 8. Buscar usuario por refresh_token
  findByRefreshToken: async (refresh_token) => {
    const [rows] = await pool.query("SELECT id, name, document, email FROM users WHERE refresh_token = ?",
      [refresh_token]
    );
    return rows[0] || null;
  },

  // 9. Borra el refresh_token
  revokeRefreshToken: async (userId) => {
    await pool.query("UPDATE users SET refresh_token = NULL WHERE id = ?",
      [userId]
    );
  },

  // 10. Incrementa versión de token para invalidar access tokens activos
  incrementTokenVersion: async (userId) => {
    await pool.query(
      "UPDATE users SET token_version = token_version + 1 WHERE id = ?",
      [userId]
    );
  },
};
