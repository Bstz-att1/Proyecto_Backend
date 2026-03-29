import { Router } from 'express';
const router = Router();

// GET /tasks
router.get('/', (req, res) => {
  res.send('Aquí se listarán las tareas');
});

// POST /tasks
router.post('/', (req, res) => {
  res.send('Aquí se creará una tarea');
});

export default router;
