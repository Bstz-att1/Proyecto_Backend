import { Router } from 'express';
const router = Router();

// GET /users
router.get('/', (req, res) => {
  res.send('Aquí se listarán los usuarios');
});

// POST /users
router.post('/', (req, res) => {
  res.send('Aquí se creará un usuario');
});

export default router;
