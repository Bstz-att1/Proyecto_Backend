import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { UserModel } from "../models/index.js";
import { catchAsync, successResponse, verifyJWT } from "../utils/index.js";


// Configuración de tiempos de expiración
const ACCESS_TOKEN_EXPIRY = '15m';    
const REFRESH_TOKEN_EXPIRY = '1d';    

// ====================================================
//                    1. LOGIN
// ====================================================
export const loginJWT = catchAsync(async (req, res, next) => {
    const { document, password } = req.body;

    // 1. Verificamos que lleguen los datos
    if (!document || !password) {
        const error = new Error("Documento y contraseña son requeridos");
        error.statusCode = 400;
        return next(error);
    }

    // 2. Buscamos al usuario
    const user = await UserModel.findByDocument(document);

    if (!user) {
        const error = new Error("Credenciales inválidas"); // Error genérico por seguridad
        error.statusCode = 401;
        return next(error);
    }

    // 3. Comparamos la contraseña
    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
        const error = new Error("Credenciales inválidas");
        error.statusCode = 401;
        return next(error);
    }

    // 4. Generación de Tokens
    const accessToken = jwt.sign(
        { userId: user.id, email: user.email, type: 'access', tokenVersion: user.token_version ?? 0 },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
        { userId: user.id, type: 'refresh', tokenVersion: user.token_version ?? 0 },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '1d' }
    );

    // Guardar refresh token en BD
    await UserModel.updateRefreshToken(user.id, refreshToken);

    // 5. Respuesta final
    successResponse(res, 200, "Login exitoso", {
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });
});

// ====================================================
//                2. REFRESH TOKEN
// ====================================================
export const refreshJWT = catchAsync(async (req, res, next) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        const error = new Error("Token de refresco requerido");
        error.statusCode = 401;
        return next(error);
    }

    // Verificación usando la utilidad en jwt.handler.js
    const result = verifyJWT(refreshToken, process.env.JWT_REFRESH_SECRET);

    if (!result.valid) {
        const error = new Error(result.message);
        error.statusCode = 401;
        return next(error);
    }

    const user = await UserModel.findByRefreshToken(refreshToken);

    if (!user || result.decoded.type !== 'refresh') {
        const error = new Error("Token inválido o revocado");
        error.statusCode = 401;
        return next(error);
    }

    const userWithVersion = await UserModel.findByDocument(user.document);

    const newAccessToken = jwt.sign(
        {
            userId: user.id,
            email: user.email,
            type: 'access',
            tokenVersion: userWithVersion?.token_version ?? 0
        },
        process.env.JWT_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRY }
    );

    const newRefreshToken = jwt.sign(
        {
            userId: user.id,
            type: 'refresh',
            tokenVersion: userWithVersion?.token_version ?? 0
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRY }
    );

    await UserModel.updateRefreshToken(user.id, newRefreshToken);

    successResponse(res, 200, "Token renovado", {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    });
});

// ====================================================
//                    3. LOGOUT
// ====================================================
export const logout = catchAsync(async (req, res, next) => {
    const { refreshToken } = req.body || {};
    const userIdFromAccessToken = req.user?.userId;

    if (!refreshToken && !userIdFromAccessToken) {
        const error = new Error("Refresh token requerido");
        error.statusCode = 400;
        return next(error);
    }

    const userByRefresh = refreshToken
        ? await UserModel.findByRefreshToken(refreshToken)
        : null;

    const targetUserId = userByRefresh?.id ?? userIdFromAccessToken;

    if (targetUserId) {
        await UserModel.revokeRefreshToken(targetUserId);
        await UserModel.incrementTokenVersion(targetUserId);
    }

    successResponse(res, 200, "Sesión cerrada correctamente");
});
