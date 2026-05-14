import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  patchUserById,
  deleteUserById
} from '../controllers/users.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { validateToken } from '../middlewares/auth.middleware.js';
import { checkPermission } from '../middlewares/rbac.middleware.js';
import { userSchema } from '../schemas/users.schema.js';

const router = Router();

// Consultar todos los usuarios
router.get('/', validateToken, checkPermission('users.get'), getUsers);

// Consultar un usuario específico
router.get('/:id', validateToken, checkPermission('users.get'), getUserById);

// Registrar un nuevo usuario
router.post(
  '/',
  validateToken,
  checkPermission('users.create'),
  validateSchema(userSchema),
  createUser
);

// Actualizar información de un usuario
router.put(
  '/:id',
  validateToken,
  checkPermission('users.update'),
  validateSchema(userSchema),
  updateUserById
);

// Actualizar informacion de un usuario parcialmente
router.patch(
  '/:id',
  validateToken,
  checkPermission('users.update'),
  validateSchema(userSchema.partial()),
  patchUserById
);

// Eliminar un usuario
router.delete('/:id', validateToken, checkPermission('users.delete'), deleteUserById);

export default router;
