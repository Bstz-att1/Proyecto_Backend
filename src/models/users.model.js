import pool from '../config/db.js';

// Crear un nuevo usuario
export const addUser = async (user) => {
  const [result] = await pool.query(
    'INSERT INTO users (name, email, document, role) VALUES (?, ?, ?, ?)',
    [user.name, user.email, user.document, user.role]
  );

  return { 
    id: result.insertId,
    name: user.name,
    email: user.email,
    document: user.document,
    role: user.role,
    created: true
  };
};

// Consultar todos los usuarios
export const getAllUsers = async () => {
  const [rows] = await pool.query('SELECT * FROM users');
  return rows.map(row => ({
    id: row.id,
    name: row.name,
    email: row.email,
    document: row.document,
    role: row.role
  }));
};

// Consultar un usuario específico
export const getUser = async (id) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows.length > 0 ? rows[0] : null;
};

// Actualizar completamente un usuario (PUT)
export const updateUser = async (id, data) => {
  const [result] = await pool.query(
    'UPDATE users SET name = ?, email = ?, document = ?, role = ? WHERE id = ?',
    [data.name, data.email, data.document, data.role, id]
  );

  return result.affectedRows > 0
    ? { id, ...data, updated: true }
    : null;
};

// Actualizar parcialmente un usuario (PATCH)
export const patchUser = async (id, data) => {
  const usuario = await getUser(id);
  if (!usuario) return null;

  const updated = {
    name: data.name ?? usuario.name,
    email: data.email ?? usuario.email,
    document: data.document ?? usuario.document,
    role: data.role ?? usuario.role
  };

  const [result] = await pool.query(
    'UPDATE users SET name = ?, email = ?, document = ?, role = ? WHERE id = ?',
    [updated.name, updated.email, updated.document, updated.role, id]
  );

  return result.affectedRows > 0
    ? { id, ...updated, updated: true }
    : null;
};

// Eliminar un usuario
export const deleteUser = async (id) => {
  const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
  return result.affectedRows > 0
    ? { id, deleted: true }
    : null;
};
