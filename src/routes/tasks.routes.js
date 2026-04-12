import { Router } from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTaskById,
  patchTaskById,
  deleteTaskById
} from '../controllers/tasks.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { taskSchema } from '../schemas/tasks.schema.js';

const router = Router();

// Consultar todas las tareas
router.get('/', getTasks);

// Consultar una tarea específica
router.get('/:id', getTaskById);

// Registrar una nueva tarea
router.post('/', validateSchema(taskSchema) , createTask);

// Actualizar información de una tarea
router.put('/:id', validateSchema(taskSchema) ,updateTaskById);

// Actualizar informacion de una tarea parcialmente
router.patch('/:id', validateSchema(taskSchema.partial()) , patchTaskById);

// Eliminar una tarea
router.delete('/:id', deleteTaskById);

export default router;
