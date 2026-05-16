import jwt from 'jsonwebtoken';

// 1. Función para firmar (Generar) tokens
export const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h'
    });
};

// 2. Función de verificación 
export const verifyJWT = (token, secret = process.env.JWT_SECRET) => {
    try {
        const decoded = jwt.verify(token, secret);
        return { valid: true, decoded };
    } catch (err) {
        let message = 'Acceso denegado: Token inválido';

        if (err.name === 'TokenExpiredError') {
            message = 'Acceso denegado: El token ha expirado, inicie sesión nuevamente';
        }

        return { valid: false, message };
    }
};
