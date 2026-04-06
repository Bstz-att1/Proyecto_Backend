import { Router } from 'express';
import { getTasks, createTask } from '../controllers/tasks.controller.js';

const router = Router();

// GET /tasks → Devuelve un mensaje indicando que se listarán las tareas
router.get('/', getTasks);

// POST /tasks → Mensaje indicando que se creará una tarea
router.post('/', createTask);

export default router;
