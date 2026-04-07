import pool from '../config/db.js';

// Modelo de Tareas 

export const addTask = (task) => {
  return { 
    message: `Tarea '${task.titulo}' registrada correctamente`,
    asignados: task.usuarios // array de IDs o nombres
  };
};

export const getAllTasks = async () => {
  const [rows] = await pool.query('SELECT * FROM tasks');
        return rows;
};

export const getTask = (id) => {
  return { message: `Consulta de la tarea con id ${id} ` };
};

export const updateTask = (id, data) => {
  return { 
    message: `Tarea con id ${id} actualizada completamente`,
    asignados: data.usuarios 
  };
};

export const patchTask = (id, data) => {
  return { 
    message: `Tarea con id ${id} actualizada parcialmente`,
    asignados: data.usuarios 
  };
};

export const deleteTask = (id) => {
  return { message: `Tarea con id ${id} eliminada correctamente` };
};
