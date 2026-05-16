
/**
    Utilidad para estandarizar las respuestas exitosas de la API
**/
export const successResponse = (res, statusCode, message, data = []) => {
    return res.status(statusCode).json({
        success: true,
        message: message,
        data: data,
        errors: [],
    });
};

/**
    Utilidad para estandarizar las respuestas de error de la API
**/

export const errorResponse = (res, statusCode, message, errors = []) => {
    // Nos aseguramos de que errors siempre sea un arreglo
    const formattedErrors = Array.isArray(errors) ? errors : [errors];

    return res.status(statusCode).json({
        success: false,
        message: message,
        data: [],
        errors: formattedErrors,
    });
};

/**
    Genera un error personalizado para respuestas controladas del servidor.
    Permite definir mensaje, código HTTP y detalles adicionales.
**/
export const buildError = (message, statusCode, details = []) => {

    // Instancia base del error con el mensaje
    const err = new Error(message);

    // Código de estado HTTP asociado (ej: 400, 404, 500)
    err.statusCode = statusCode;

    // Marca el error como operacional (previsto y manejable)
    err.isOperational = true;

    // Lista de detalles; si no hay, se usa el mensaje principal
    err.errors = details.length ? details : [message];

    // Retorna el error para que lo procese el middleware
    return err;
};

/**
    Crea un error 401 estandarizado para rutas protegidas
**/
export const buildUnauthorizedError = (detail = "No autorizado. Debe iniciar sesión para acceder a este recurso.") => {
    return buildError(
        "No autorizado. Debe iniciar sesión para acceder a este recurso.",
        401,
        [detail]
    );
};
