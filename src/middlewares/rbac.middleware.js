import { RoleModel } from '../models/index.js';
import { buildError, buildUnauthorizedError, catchAsync } from '../utils/index.js';

export const checkPermission = (requiredPermission) =>
  catchAsync(async (req, res, next) => {
    const userId = req.user?.userId;

    if (!userId) {
      return next(
        buildUnauthorizedError('No se encontró información del usuario en la solicitud')
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
