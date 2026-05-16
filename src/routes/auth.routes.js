import { Router } from 'express';
import { loginJWT, refreshJWT, logout } from '../controllers/index.js';
import { validateToken } from '../middlewares/index.js';

const router = Router();

/**
 * @route   POST /api/auth/login
 * @desc    Iniciar sesión y obtener tokens (Access & Refresh)
 */
router.post('/login', loginJWT);

/**
 * @route   POST /api/auth/refresh
 * @desc    Renovar el Access Token usando un Refresh Token válido
 */
router.post('/refresh', refreshJWT);

/**
 * @route   POST /api/auth/logout
 * @desc    Cerrar sesión y revocar el Refresh Token de la base de datos
 */
router.post('/logout', validateToken, logout);

export default router;