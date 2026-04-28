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
