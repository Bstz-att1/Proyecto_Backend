import { Router } from 'express';
import { getUsers, createUser } from '../controllers/users.controller.js';

const router = Router();

// GET /users → Devuelve un mensaje indicando que se listarán los usuarios
router.get('/', getUsers);

// POST /users → Mensaje indicando que se creará un usuario
router.post('/', createUser);

export default router;
