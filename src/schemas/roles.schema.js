import { z } from 'zod';

export const roleManagementSchema = z.object({
  name: z
    .string({ message: 'El nombre del rol es obligatorio' })
    .trim()
    .min(3, { message: 'El nombre del rol debe tener al menos 3 caracteres' })
    .max(50, { message: 'El nombre del rol no puede superar 50 caracteres' }),
  description: z
    .string({ message: 'La descripción debe ser texto' })
    .trim()
    .max(255, { message: 'La descripción no puede superar 255 caracteres' })
    .optional()
    .or(z.literal('')),
  permissions: z
    .array(
      z
        .string({ message: 'Cada permiso debe ser texto' })
        .trim()
        .min(1, { message: 'El código de permiso no puede estar vacío' })
        .regex(/^[a-z]+:[a-z_]+$/, {
          message: 'El permiso debe seguir el formato recurso:accion',
        })
    )
    .min(1, { message: 'Debes enviar al menos un permiso' }),
});
