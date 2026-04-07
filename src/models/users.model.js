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
    role: user.role
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
  if (rows.length === 0) return null; // <- devuelve null si no existe
  return rows[0];
};

// Actualizar completamente un usuario
export const updateUser = async (id, data) => {
  const [result] = await pool.query(
    'UPDATE users SET name = ?, email = ?, document = ?, role = ? WHERE id = ?',
    [data.name, data.email, data.document, data.role, id]
  );

  if (result.affectedRows === 0) return null; // <- devuelve null si no existe
  return { id, ...data };
};

// Actualizar parcialmente un usuario
export const patchUser = async (id, data) => {
  const usuario = await getUser(id);
  if (!usuario) return null; // <- devuelve null si no existe

  const updated = {
    name: data.name || usuario.name,
    email: data.email || usuario.email,
    document: data.document || usuario.document,
    role: data.role || usuario.role
  };

  const [result] = await pool.query(
    'UPDATE users SET name = ?, email = ?, document = ?, role = ? WHERE id = ?',
    [updated.name, updated.email, updated.document, updated.role, id]
  );

  if (result.affectedRows === 0) return null; // <- seguridad extra
  return { id, ...updated };
};

// Eliminar un usuario
export const deleteUser = async (id) => {
  const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);

  if (result.affectedRows === 0) {
    // No se eliminó nada porque no existía el usuario
    return null;
  }

  return { message: `Usuario con id ${id} eliminado correctamente` };
};
