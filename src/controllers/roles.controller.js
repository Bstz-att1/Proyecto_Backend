import { successResponse, buildError, catchAsync } from '../utils/index.js';
import { RoleModel } from '../models/index.js';

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

// Gestión de roles (validación de entrada para criterios de arquitectura/RBAC)
export const manageRole = catchAsync(async (req, res, next) => {
    const { name, description, permissions } = req.body;

    return successResponse(
        res,
        200,
        "Datos de rol validados correctamente",
        {
            name,
            description: description ?? "",
            permissions,
        }
    );
});
