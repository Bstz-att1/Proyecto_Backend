import { getAllTasks, getTask, addTask, updateTask, patchTask, deleteTask } from '../models/tasks.model.js';

// Consultar todas las tareas
export const getTasks = async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.status(200).json(tasks);
  } catch {
    res.status(500).json({ message: 'Error al obtener tareas' });
  }
};

// Consultar una tarea específica
export const getTaskById = (req, res) => {
  try {
    const task = getTask(req.params.id);
    res.status(200).json(task);
  } catch {
    res.status(500).json({ message: 'Error al obtener tarea' });
  }
};

// Registrar una nueva tarea con múltiples usuarios
export const createTask = (req, res) => {
  try {
    const { titulo, usuarios } = req.body;

    if (!titulo) {
      return res.status(400).json({ message: 'El título es obligatorio' });
    }
    if (!usuarios || !Array.isArray(usuarios) || usuarios.length === 0) {
      return res.status(400).json({ message: 'Debe asignar al menos un usuario para la tarea' });
    }

    const newTask = addTask({ titulo, usuarios });
    res.status(201).json({ message: 'Tarea creada', task: newTask });
  } catch {
    res.status(500).json({ message: 'Error al crear tarea' });
  }
};

// Actualizar información de una tarea
export const updateTaskById = (req, res) => {
  try {
    const updated = updateTask(req.params.id, req.body);
    res.status(200).json({ message: 'Tarea actualizada', task: updated });
  } catch {
    res.status(500).json({ message: 'Error al actualizar tarea' });
  }
};

// PATCH → actualización parcial (ej. solo usuarios)
export const patchTaskById = (req, res) => {
  try {
    const patched = patchTask(req.params.id, req.body);
    res.status(200).json({ message: 'Tarea actualizada parcialmente', task: patched });
  } catch {
    res.status(500).json({ message: 'Error al actualizar parcialmente la tarea' });
  }
};

// Eliminar una tarea
export const deleteTaskById = (req, res) => {
  try {
    const deleted = deleteTask(req.params.id);
    res.status(200).json({ message: 'Tarea eliminada', task: deleted });
  } catch {
    res.status(500).json({ message: 'Error al eliminar tarea' });
  }
};
