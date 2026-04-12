import { buildError } from "../utils/response.handler.js";

export const validateSchema = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const structuredErrors = result.error.issues.map((issue) => {
        let finalMessage = issue.message;

        // Traducciones personalizadas
        if (finalMessage.includes("Invalid input: expected number")) {
            finalMessage = "El ID de usuario debe ser un número";
        }
        if (finalMessage.includes("Invalid input: expected string")) {
            finalMessage = "El campo debe ser un texto";
        }
        if (finalMessage.includes("received undefined")) {
            finalMessage = "Este campo es obligatorio";
        }

        return {
          field: issue.path.length > 0 ? issue.path[0] : "body",
          message: finalMessage,
        };
      });

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
