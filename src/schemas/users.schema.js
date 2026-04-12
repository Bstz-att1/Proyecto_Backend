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

  role: z
    .string({
      required_error: "El rol es obligatorio",
      invalid_type_error: "El rol debe ser un texto",
    })
    .refine((val) => ["admin", "user"].includes(val), {
      message: "Rol inválido: debe ser admin o user",
    }),
});
