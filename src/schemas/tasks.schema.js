import { z } from "zod";

export const taskSchema = z.object({
  user_id: z
    .number({
      required_error: "El ID de usuario es obligatorio",
      invalid_type_error: "El ID de usuario debe ser un número",
    }),

  title: z
    .string({
      required_error: "El título es obligatorio",
      invalid_type_error: "El título debe ser un texto",
    })
    .min(10, "El título debe tener al menos 10 caracteres"),

  description: z
    .string({
      required_error: "La descripción es obligatoria",
      invalid_type_error: "La descripción debe ser un texto",
    })
    .min(5, "La descripción debe tener al menos 5 caracteres"),

  status: z
    .string({
      required_error: "El estado es obligatorio",
      invalid_type_error: "El estado debe ser un texto",
    })
    .refine((val) => ["pendiente", "en progreso", "completada"].includes(val), {
      message: "Estado inválido: debe ser pendiente, en progreso o completada",
    }),

  created_by: z
    .string({
      required_error: "El rol es obligatorio",
      invalid_type_error: "El rol debe ser un texto",
    })
    .transform((val) => val.trim().toUpperCase())
    .refine((val) => ["ADMIN", "SUPERVISOR", "USER"].includes(val), {
      message: "Creador invalido: debe ser ADMIN, SUPERVISOR o USER",
    }),
});
