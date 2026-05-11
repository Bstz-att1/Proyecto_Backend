import express from 'express';
import cors from "cors";
import "dotenv/config"; // Importante para cargar las variables de entorno (.env)

// Rutas
import authRoutes from './routes/auth.routes.js'; // <-- NUEVA IMPORTACIÓN
import userRoutes from './routes/users.routes.js';
import taskRoutes from './routes/tasks.routes.js';

import { successResponse } from "./utils/response.handler.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js"

const app = express();

// Middlewares base 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta raíz
app.get('/', (req, res) => {
    successResponse(res, 200, 'Bienvenido al sistema de gestión académica');
});

// Definición de Rutas
app.use('/auth', authRoutes); 
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

// Middleware de errores (Siempre al final)
app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});