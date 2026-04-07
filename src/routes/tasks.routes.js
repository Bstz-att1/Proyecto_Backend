import { Router } from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTaskById,
  patchTaskById,
  deleteTaskById
} from '../controllers/tasks.controller.js';

const router = Router();

// Consultar todas las tareas
router.get('/', getTasks);

// Consultar una tarea específica
router.get('/:id', getTaskById);

// Registrar una nueva tarea
router.post('/', createTask);

// Actualizar información de una tarea
router.put('/:id', updateTaskById);

// Actualizar informacion de una tarea parcialmente
router.patch('/:id', patchTaskById);

// Eliminar una tarea
router.delete('/:id', deleteTaskById);

export default router;
