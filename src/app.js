import express from 'express';
import userRoutes from './routes/users.routes.js';
import taskRoutes from './routes/tasks.routes.js';

const app = express();
const PORT = 3000;

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Bienvenido al sistema de gestión de tareas academicas');
});

// Rutas
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
