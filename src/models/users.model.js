import pool from '../config/db.js';

export const UsersModel = {
  // 1. Obtener todos los usuarios (sin datos sensibles)
  getAll: async () => {
    const [users] = await pool.query(
      'SELECT id, name, email, document, role, created_at, updated_at FROM users'
    );
    return users;
  },

  // 2. Obtener un usuario por ID
  findById: async (id) => {
    const [rows] = await pool.query(
      'SELECT id, name, email, document, role, created_at, updated_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  },

  // 3. Obtener usuario por documento (auth, incluye password_hash)
  findByDocument: async (document) => {
    const [rows] = await pool.query(
      'SELECT id, name, email, document, role, password_hash, refresh_token, created_at, updated_at FROM users WHERE document = ?',
      [document]
    );
    return rows[0] || null;
  },

  // 4. Crear un nuevo usuario
  create: async (newUser) => {
    const { name, email, document, role, password_hash } = newUser;
    const [result] = await pool.query(
      'INSERT INTO users (name, email, document, role, password_hash) VALUES (?, ?, ?, ?, ?)',
      [name, email, document, role, password_hash]
    );

    return await UsersModel.findById(result.insertId);
  },

  // 5. Actualizar usuario (PUT/PATCH con objeto dinámico)
  update: async (id, data) => {
    const [result] = await pool.query('UPDATE users SET ? WHERE id = ?', [data, id]);
    if (result.affectedRows === 0) return null;

    return await UsersModel.findById(id);
  },

  // 6. Eliminar usuario
  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },

  // 7. Actualizar refresh token
  updateRefreshToken: async (userId, refreshToken) => {
    await pool.query('UPDATE users SET refresh_token = ? WHERE id = ?', [refreshToken, userId]);
  },

  // 8. Buscar usuario por refresh token
  findByRefreshToken: async (refreshToken) => {
    const [rows] = await pool.query(
      'SELECT id, name, email, document, role, refresh_token, created_at, updated_at FROM users WHERE refresh_token = ?',
      [refreshToken]
    );
    return rows[0] || null;
  },

  // 9. Revocar refresh token
  revokeRefreshToken: async (userId) => {
    await pool.query('UPDATE users SET refresh_token = NULL WHERE id = ?', [userId]);
  }
};

