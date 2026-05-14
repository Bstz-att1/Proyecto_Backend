import { verifyJWT, catchAsync } from '../utils/index.js';
import "dotenv/config";

export const validateToken = catchAsync(async (req, res, next) => {
    let token;

    // 1. Obtener token del header Authorization: Bearer <token>
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // 2. Si no hay token, lanzamos error al middleware global
    if (!token) {
        const error = new Error('Acceso denegado: No se proporcionó un token');
        error.statusCode = 401;
        return next(error);
    }

    // 3. Verificar token con utilidad
    const result = verifyJWT(token);

    if (!result.valid) {
        const error = new Error(result.message);
        error.statusCode = 401;
        return next(error);
    }

    const decoded = result.decoded;

    // 4. Verificar que sea tipo access
    if (decoded.type !== 'access') {
        const error = new Error('Acceso denegado: El token no es válido para esta operación');
        error.statusCode = 401;
        return next(error);
    }

    // 5. Adjuntar la info del usuario al request (req.user)
    req.user = {
        userId: decoded.userId,
        email: decoded.email,
        document: decoded.document,
    };

    // 6. ¡Todo bien! Continuamos al siguiente middleware o controlador
    next();
});