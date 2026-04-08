import express from 'express';
import cors from "cors";
import userRoutes from './routes/users.routes.js';
import taskRoutes from './routes/tasks.routes.js';
import { successResponse } from "./utils/response.handler.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js"

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Habilitar cors para todas las rutas
app.use(cors());

// Ruta raíz
app.get('/', (req, res) => {
    successResponse(res, 200, 'Bienvenido al sistema de gestión académica');
});

// Usar rutas
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

// Middleware de interpretacion JAVASCRIPT
app.use(express.urlencoded({ extended: true }));

// Middleware de errores 
app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
