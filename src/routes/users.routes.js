import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  patchUserById,
  deleteUserById
} from '../controllers/users.controller.js';

const router = Router();

// Consultar todos los usuarios
router.get('/', getUsers);

// Consultar un usuario específico
router.get('/:id', getUserById);

// Registrar un nuevo usuario
router.post('/', createUser);

// Actualizar información de un usuario
router.put('/:id', updateUserById);

// Actualizar informacion de un usuario parcialmente
router.patch('/:id', patchUserById);

// Eliminar un usuario
router.delete('/:id', deleteUserById);

export default router;
