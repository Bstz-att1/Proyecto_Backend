import { ur } from "zod/locales";
import pool from "../config/db.js";

export const UserModel = {
  // 1. Obtener todos los usuarios (Excluimos datos sensibles)
  getAll: async () => {
    const [users] = await pool.query("SELECT id, name, document, email, created_at FROM users");
    return users;
  },

  // 2. Obtener un usuario por ID
  findById: async (id) => {
    const [user] = await pool.query("SELECT id, name, document, email FROM users WHERE id = ?", [id]);
    return user[0] || null;
  },

  // 3. Obtener usuario por documento (Para el LOGIN: aquí SÍ necesitamos el password_hash)
  findByDocument: async (document) => {
    const [user] = await pool.query(
      "SELECT id, name, document, email, password_hash FROM users WHERE document = ?", 
      [document]
    );
    return user[0] || null;
  },

  // 4. Actualizar usuario
  update: async (id, data) => {
    // Usamos pool.query con el objeto data para que mysql2 mapee las columnas automáticamente
    const [result] = await pool.query("UPDATE users SET ? WHERE id = ?", [data, id]);
    if (result.affectedRows === 0) return null;

    return await UserModel.findById(id);
  },

  // 5. Eliminar usuario
  delete: async (id) => {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows > 0;
  },

  // 6. Crear un nuevo usuario
  create: async (newUser) => {
    const { name, document, email, password_hash } = newUser;
    const [result] = await pool.query(
      "INSERT INTO users (name, document, email, password_hash) VALUES (?, ?, ?, ?)",
      [name, document, email, password_hash],
    );

    return await UserModel.findById(result.insertId);
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
};