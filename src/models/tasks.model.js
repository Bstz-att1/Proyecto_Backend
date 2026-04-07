import pool from '../config/db.js';

// Registrar una nueva tarea
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
    created_by: task.created_by
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
  if (rows.length === 0) return null;
  return {
    id: rows[0].id,
    user_id: rows[0].user_id,
    title: rows[0].title,
    description: rows[0].description,
    status: rows[0].status,
    created_by: rows[0].created_by
  };
};

// Actualizar completamente una tarea
export const updateTask = async (id, data) => {
  await pool.query(
    'UPDATE tasks SET user_id = ?, title = ?, description = ?, status = ?, created_by = ? WHERE id = ?',
    [data.user_id, data.title, data.description, data.status, data.created_by, id]
  );
  return { id, ...data };
};

// Actualizar parcialmente una tarea
export const patchTask = async (id, data) => {
  const tarea = await getTask(id);
  if (!tarea) return null;

  const updated = {
    user_id: data.user_id || tarea.user_id,
    title: data.title || tarea.title,
    description: data.description || tarea.description,
    status: data.status || tarea.status,
    created_by: data.created_by || tarea.created_by
  };

  await pool.query(
    'UPDATE tasks SET user_id = ?, title = ?, description = ?, status = ?, created_by = ? WHERE id = ?',
    [updated.user_id, updated.title, updated.description, updated.status, updated.created_by, id]
  );
  return { id, ...updated };
};

// Eliminar una tarea
export const deleteTask = async (id) => {
  await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
  return { message: `Tarea con id ${id} eliminada correctamente` };
};
