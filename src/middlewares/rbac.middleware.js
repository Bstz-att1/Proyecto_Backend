import { RoleModel } from '../models/index.js';
import { buildError, buildUnauthorizedError, catchAsync } from '../utils/index.js';

/**
 * Verifica que el usuario autenticado tenga un permiso requerido.
 * Adapta la lista de permisos a formato de códigos para evaluación RBAC.
 */
export const checkPermission = (requiredPermission) =>
  catchAsync(async (req, res, next) => {
    const userId = req.user?.userId;

    if (!userId) {
      return next(
        buildUnauthorizedError('No se encontró información del usuario en la solicitud')
      );
    }

    // Obtiene permisos completos (code + description) para trazabilidad funcional.
    const permissions = await RoleModel.getPermissionsByUserId(userId);
    req.user.permissions = permissions;

    // Normaliza permisos al conjunto de códigos para verificación de acceso.
    const permissionCodes = permissions.map((permission) => permission.code);
    const hasPermission = permissionCodes.includes(requiredPermission);

    if (!hasPermission) {
      return next(
        buildError('Forbidden', 403, [
          `No tienes permiso para realizar esta acción: ${requiredPermission}`,
        ])
      );
    }

    next();
  });
