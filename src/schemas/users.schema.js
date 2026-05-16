import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string({
      required_error: "El nombre es obligatorio",
      invalid_type_error: "El nombre debe ser un texto",
    })
    .min(3, "El nombre debe tener al menos 3 caracteres"),

  email: z
    .string({
      required_error: "El correo electrónico es obligatorio",
      invalid_type_error: "El correo debe ser un texto",
    })
    .email("Formato de correo electrónico inválido"),

  document: z
    .string({
      required_error: "El documento es obligatorio",
      invalid_type_error: "El documento debe ser un texto",
    })
    .min(4, "El documento debe tener al menos 4 caracteres"),

  password: z
    .string({
      required_error: "La contraseña es obligatoria",
      invalid_type_error: "La contraseña debe ser un texto",
    })
    .min(6, "La contraseña debe tener al menos 6 caracteres"),

  role: z
    .string({
      required_error: "El rol es obligatorio",
      invalid_type_error: "El rol debe ser un texto",
    })
    .transform((val) => val.trim().toUpperCase())
    .refine((val) => ["ADMIN", "SUPERVISOR", "USER"].includes(val), {
      message: "Rol inválido: debe ser ADMIN, SUPERVISOR o USER",
    }),
});
