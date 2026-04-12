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
import { userSchema } from '../schemas/users.schema.js';

const router = Router();

// Consultar todos los usuarios
router.get('/', getUsers);

// Consultar un usuario específico
router.get('/:id', getUserById);

// Registrar un nuevo usuario
router.post('/',  validateSchema(userSchema), createUser);

// Actualizar información de un usuario
router.put('/:id', validateSchema(userSchema),  updateUserById);

// Actualizar informacion de un usuario parcialmente
router.patch('/:id', validateSchema(userSchema.partial()),  patchUserById);

// Eliminar un usuario
router.delete('/:id', deleteUserById);

export default router;
