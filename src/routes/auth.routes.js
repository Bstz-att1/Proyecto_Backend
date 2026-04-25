import { Router } from 'express';
import { loginJWT, refreshJWT, logout } from '../controllers/auth.controller.js';

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
router.post('/logout', logout);

export default router;