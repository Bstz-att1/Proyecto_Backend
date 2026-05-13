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
import { validateToken } from '../middlewares/auth.middleware.js';
import { checkPermission } from '../middlewares/rbac.middleware.js';
import { taskSchema } from '../schemas/tasks.schema.js';

const router = Router();

// Consultar todas las tareas
router.get('/', validateToken, checkPermission('tasks.get'), getTasks);

// Consultar una tarea específica
router.get('/:id', validateToken, checkPermission('tasks.get'), getTaskById);

// Registrar una nueva tarea
router.post(
  '/',
  validateToken,
  checkPermission('tasks.create'),
  validateSchema(taskSchema),
  createTask
);

// Actualizar información de una tarea
router.put(
  '/:id',
  validateToken,
  checkPermission('tasks.update'),
  validateSchema(taskSchema),
  updateTaskById
);

// Actualizar informacion de una tarea parcialmente
router.patch(
  '/:id',
  validateToken,
  checkPermission('tasks.update'),
  validateSchema(taskSchema.partial()),
  patchTaskById
);

// Eliminar una tarea
router.delete('/:id', validateToken, checkPermission('tasks.delete'), deleteTaskById);

export default router;
