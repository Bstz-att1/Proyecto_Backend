import { RoleModel } from '../models/roles.model.js';
import { buildError } from '../utils/response.handler.js';
import { catchAsync } from '../utils/catchAsync.js';

export const checkPermission = (requiredPermission) =>
  catchAsync(async (req, res, next) => {
    const userId = req.user?.userId;

    if (!userId) {
      return next(
        buildError('No autenticado', 401, [
          'No se encontró información del usuario en la solicitud',
        ])
      );
    }

    const permissions = await RoleModel.getPermissionsByUserId(userId);
    req.user.permissions = permissions;

    const hasPermission = permissions.includes(requiredPermission);

    if (!hasPermission) {
      return next(
        buildError('Forbidden', 403, [
          `No tienes permiso para realizar esta acción: ${requiredPermission}`,
        ])
      );
    }

    next();
  });
