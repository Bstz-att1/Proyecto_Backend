import jwt from 'jsonwebtoken';

// Generar token con JWT_SECRET
export const generateToken = (payload, secret = process.env.JWT_SECRET, expiresIn = '1h') => {
  return jwt.sign(payload, secret, { expiresIn });
};

// Verificar token con JWT_SECRET (o secret personalizado)
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
