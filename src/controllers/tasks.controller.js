import { 
  getAllTasks, 
  getTask, 
  addTask, 
  updateTask, 
  patchTask, 
  deleteTask 
} from '../models/tasks.model.js';

// Consultar todas las tareas
export const getTasks = async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tareas', error: error.message });
  }
};

// Consultar una tarea específica
export const getTaskById = async (req, res) => {
  try {
    const task = await getTask(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tarea', error: error.message });
  }
};

// Registrar una nueva tarea
export const createTask = async (req, res) => {
  try {
    const { user_id, title, description, status, created_by } = req.body;

    if (!user_id || !title || !description || !status || !created_by) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios: user_id, title, description, status, created_by' });
    }

    const newTask = await addTask({ user_id, title, description, status, created_by });
    res.status(201).json({ message: 'Tarea creada', task: newTask });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear tarea', error: error.message });
  }
};

// Actualizar información de una tarea (PUT)
export const updateTaskById = async (req, res) => {
  try {
    const updated = await updateTask(req.params.id, req.body);
    res.status(200).json({ message: 'Tarea actualizada', task: updated });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar tarea', error: error.message });
  }
};

// Actualización parcial de una tarea (PATCH)
export const patchTaskById = async (req, res) => {
  try {
    const patched = await patchTask(req.params.id, req.body);
    if (!patched) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.status(200).json({ message: 'Tarea actualizada parcialmente', task: patched });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar parcialmente la tarea', error: error.message });
  }
};

// Eliminar una tarea
export const deleteTaskById = async (req, res) => {
  try {
    const deleted = await deleteTask(req.params.id);
    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar tarea', error: error.message });
  }
};
