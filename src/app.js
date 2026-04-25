import express from 'express';
import cors from "cors";

// Importación de Rutas
import userRoutes from './routes/users.routes.js';
import taskRoutes from './routes/tasks.routes.js';
import authRoutes from './routes/auth.routes.js';

// Importación de Middlewares
import { successResponse } from "./utils/response.handler.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js"

const app = express();
const PORT = 3000;

// ============================================
//           MIDDLEWARES DE NIVEL APP
// ============================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Habilitar cors para todas las rutas
app.use(cors());

// Ruta raíz
app.get('/', (req, res) => {
    successResponse(res, 200, 'Bienvenido al sistema de gestión académica');
});

// ============================================
//              MONTAJE DE RUTAS
// ============================================

// Rutas de Autenticación (Públicas: Login, Refresh, Logout)
app.use('/api/auth', authRoutes);

// Rutas de Usuarios (Protegidas internamente con validateToken)
app.use('/users', userRoutes);
// Rutas de Negocio

app.use('/tasks', taskRoutes);


// ============================================
//        MANEJO GLOBAL DE ERRORES
// ============================================
// Siempre debe ir después de todas las rutas
app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
