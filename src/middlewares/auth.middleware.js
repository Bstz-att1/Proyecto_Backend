import { verifyJWT, catchAsync, buildUnauthorizedError } from '../utils/index.js';
import { UserModel } from '../models/index.js';
import "dotenv/config";

export const validateToken = catchAsync(async (req, res, next) => {
    let token;

    // 1. Obtener token del header Authorization: Bearer <token>
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // 2. Si no hay token, lanzamos error al middleware global
    if (!token) {
        return next(buildUnauthorizedError('No se proporcionó token de acceso'));
    }

    // 3. Verificar token con utilidad
    const result = verifyJWT(token, process.env.JWT_SECRET);

    if (!result.valid) {
        return next(buildUnauthorizedError(result.message));
    }

    const decoded = result.decoded;

    // 4. Verificar que sea tipo access
    if (decoded.type !== 'access') {
        return next(buildUnauthorizedError('El token no es válido para esta operación'));
    }

    const dbUser = await UserModel.findByIdWithTokenVersion(decoded.userId);

    if (!dbUser || (decoded.tokenVersion ?? -1) !== dbUser.token_version) {
        return next(buildUnauthorizedError('La sesión no es válida o ha sido cerrada'));
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
