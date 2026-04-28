import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { UserModel } from "../models/users.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import { successResponse } from "../utils/response.handler.js";
import { verifyJWT } from "../utils/jwt.handler.js"; 


// Configuración de tiempos de expiración
const ACCESS_TOKEN_EXPIRY = '15m';    
const REFRESH_TOKEN_EXPIRY = '1d';    

// ====================================================
//                    1. LOGIN
// ====================================================
export const loginJWT = catchAsync(async (req, res, next) => {
    const { document, password } = req.body;

    const user = await UserModel.findByDocument(document);

    if (!user) {
        const error = new Error(`No se encontró al usuario con documento ${document}`);
        error.statusCode = 401;
        return next(error);
    }

    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
        const error = new Error(`Credenciales inválidas`);
        error.statusCode = 401;
        return next(error);
    }

    // 3. Generamos el Access Token 
    const accessToken = jwt.sign(
        { 
            userId: user.id, 
            email: user.email, 
            type: 'access',
        },
        process.env.JWT_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRY }
    );

    const refreshToken = jwt.sign(
        { userId: user.id, type: 'refresh' },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRY }
    );

    await UserModel.updateRefreshToken(user.id, refreshToken);

    // 4. Enviamos la respuesta exitosa
    successResponse(res, 200, "Login exitoso", {
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        },
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

    const newAccessToken = jwt.sign(
        { userId: user.id, email: user.email, type: 'access' },
        process.env.JWT_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRY }
    );

    const newRefreshToken = jwt.sign(
        { userId: user.id, type: 'refresh' },
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
    const { refreshToken } = req.body;

    if (!refreshToken) {
        const error = new Error("Refresh token requerido");
        error.statusCode = 400;
        return next(error);
    }

    const user = await UserModel.findByRefreshToken(refreshToken);

    if (user) {
        await UserModel.revokeRefreshToken(user.id);
    }

    successResponse(res, 200, "Sesión cerrada correctamente");
});