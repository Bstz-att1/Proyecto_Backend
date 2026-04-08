
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