import { successResponse, buildError } from '../utils/response.handler.js';
import { catchAsync } from '../utils/catchAsync.js';
import { RoleModel } from '../models/roles.model.js';

// Consultar todos los roles
export const getRoles = catchAsync(async (req, res, next) => {
    const roles = await RoleModel.findAll();
    return successResponse(res, 200, "Listado de roles obtenido exitosamente", roles);
});

// Consultar un rol específico
export const getRoleById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const parsedId = Number(id);

    if (!Number.isInteger(parsedId) || parsedId <= 0) {
        return next(buildError("ID de rol inválido", 400, ["El parámetro id debe ser un número entero positivo"]));
    }

    const role = await RoleModel.findById(parsedId);

    if (!role) {
        return next(buildError("Rol no encontrado", 404, [`No se encontró ningún rol con el ID ${id}`]));
    }

    return successResponse(res, 200, `Rol con ID ${id} encontrado exitosamente`, role);
});
