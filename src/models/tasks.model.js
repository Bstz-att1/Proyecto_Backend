import pool from '../config/db.js';

// Crear una nueva tarea
export const addTask = async (task) => {
  const [result] = await pool.query(
    'INSERT INTO tasks (user_id, title, description, status, created_by) VALUES (?, ?, ?, ?, ?)',
    [task.user_id, task.title, task.description, task.status, task.created_by]
  );

  return {
    id: result.insertId,
    user_id: task.user_id,
    title: task.title,
    description: task.description,
    status: task.status,
    created_by: task.created_by,
    created: true
  };
};

// Consultar todas las tareas
export const getAllTasks = async () => {
  const [rows] = await pool.query('SELECT * FROM tasks');
  return rows.map(row => ({
    id: row.id,
    user_id: row.user_id,
    title: row.title,
    description: row.description,
    status: row.status,
    created_by: row.created_by
  }));
};

// Consultar una tarea específica
export const getTask = async (id) => {
  const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
  return rows.length > 0 ? rows[0] : null;
};

// Actualizar completamente una tarea (PUT)
export const updateTask = async (id, data) => {
  const [result] = await pool.query(
    'UPDATE tasks SET user_id = ?, title = ?, description = ?, status = ?, created_by = ? WHERE id = ?',
    [data.user_id, data.title, data.description, data.status, data.created_by, id]
  );

  return result.affectedRows > 0
    ? { id, ...data, updated: true }
    : null;
};

// Actualización parcial de una tarea (PATCH)
export const patchTask = async (id, data) => {
  const tarea = await getTask(id);
  if (!tarea) return null;

  const updated = {
    user_id: data.user_id ?? tarea.user_id,
    title: data.title ?? tarea.title,
    description: data.description ?? tarea.description,
    status: data.status ?? tarea.status,
    created_by: data.created_by ?? tarea.created_by
  };

  const [result] = await pool.query(
    'UPDATE tasks SET user_id = ?, title = ?, description = ?, status = ?, created_by = ? WHERE id = ?',
    [updated.user_id, updated.title, updated.description, updated.status, updated.created_by, id]
  );

  return result.affectedRows > 0
    ? { id, ...updated, updated: true }
    : null;
};

// Eliminar una tarea
export const deleteTask = async (id) => {
  const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
  return result.affectedRows > 0
    ? { id, deleted: true }
    : null;
};
