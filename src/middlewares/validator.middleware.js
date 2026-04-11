import { buildError } from "../utils/response.handler";

export const validateSchema = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const structuredErrors = result.error.issues.map((issue) => {
                let finalMessage = issue.message;

                // Si detectamos que Zod escupió su error por defecto en inglés por un campo faltante
                if (finalMessage.includes("received undefined")) {
                    finalMessage = "Este campo es obligatorio";
                }

                return {
                    field: issue.path.length > 0 ? issue.path[0] : "body",
                    message: finalMessage,
                };
            });

            // Estructuraccion de error
            const validationError = buildError(
                "Error de validación en los datos enviados",
                400,
                structuredErrors
            );

            return next(validationError);
        }

        req.body = result.data;
        next();
    };
};