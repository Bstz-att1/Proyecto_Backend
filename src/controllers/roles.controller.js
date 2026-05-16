import { successResponse, buildError, catchAsync } from '../utils/index.js';
import { RoleModel } from '../models/index.js';

const parseRoleId = (id) => {
    const parsedId = Number(id);
    return Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null;
};

// Consultar todos los roles
export const getRoles = catchAsync(async (req, res, next) => {
    const roles = await RoleModel.findAll();
    return successResponse(res, 200, "Listado de roles obtenido exitosamente", roles);
});

// Consultar un rol específico
export const getRoleById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const parsedId = parseRoleId(id);

    if (!parsedId) {
        return next(buildError("ID de rol inválido", 400, ["El parámetro id debe ser un número entero positivo"]));
    }

    const role = await RoleModel.findById(parsedId);

    if (!role) {
        return next(buildError("Rol no encontrado", 404, [`No se encontró ningún rol con el ID ${id}`]));
    }

    return successResponse(res, 200, `Rol con ID ${id} encontrado exitosamente`, role);
});

// Consultar permisos de un rol específico
export const getRolePermissionsById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const parsedId = parseRoleId(id);

    if (!parsedId) {
        return next(buildError("ID de rol inválido", 400, ["El parámetro id debe ser un número entero positivo"]));
    }

    const role = await RoleModel.findById(parsedId);

    if (!role) {
        return next(buildError("Rol no encontrado", 404, [`No se encontró ningún rol con el ID ${id}`]));
    }

    const permissions = await RoleModel.findPermissionsByRoleId(parsedId);

    return successResponse(
        res,
        200,
        `Permisos del rol con ID ${id} obtenidos exitosamente`,
        permissions
    );
});

// Crear un nuevo rol
export const createRole = catchAsync(async (req, res, next) => {
    const { name, description, permissions } = req.body;

    const existingRole = await RoleModel.findByName(name);
    if (existingRole) {
        return next(buildError("Rol duplicado", 409, [`Ya existe un rol con el nombre '${name}'`]));
    }

    const foundPermissions = await RoleModel.findPermissionsByCodes(permissions);
    const foundCodes = new Set(foundPermissions.map((permission) => permission.code));
    const missingPermissions = permissions.filter((code) => !foundCodes.has(code));

    if (missingPermissions.length > 0) {
        return next(
            buildError(
                "Permisos inválidos",
                400,
                [`No existen los siguientes permisos: ${missingPermissions.join(", ")}`]
            )
        );
    }

    const role = await RoleModel.createWithPermissions({
        name,
        description: description ?? null,
        permissions: foundPermissions.map((permission) => permission.id),
    });

    return successResponse(res, 201, "Rol creado exitosamente", role);
});

// Actualizar completamente un rol (PUT)
export const updateRoleById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const parsedId = parseRoleId(id);

    if (!parsedId) {
        return next(buildError("ID de rol inválido", 400, ["El parámetro id debe ser un número entero positivo"]));
    }

    const roleData = req.body;

    if (Object.keys(roleData).length === 0) {
        return next(buildError("Error al actualizar rol", 400, ["Debes enviar al menos un campo para actualizar"]));
    }

    const foundRole = await RoleModel.findById(parsedId);
    if (!foundRole) {
        return next(buildError("Error al actualizar rol", 404, [`No se encontró el rol con el ID ${id}`]));
    }

    if (roleData.name && roleData.name !== foundRole.name) {
        const existingRole = await RoleModel.findByName(roleData.name);
        if (existingRole && existingRole.id !== parsedId) {
            return next(buildError("Rol duplicado", 409, [`Ya existe un rol con el nombre '${roleData.name}'`]));
        }
    }

    let permissionIds;
    if (Object.prototype.hasOwnProperty.call(roleData, "permissions")) {
        const foundPermissions = await RoleModel.findPermissionsByCodes(roleData.permissions);
        const foundCodes = new Set(foundPermissions.map((permission) => permission.code));
        const missingPermissions = roleData.permissions.filter((code) => !foundCodes.has(code));

        if (missingPermissions.length > 0) {
            return next(
                buildError(
                    "Permisos inválidos",
                    400,
                    [`No existen los siguientes permisos: ${missingPermissions.join(", ")}`]
                )
            );
        }

        permissionIds = foundPermissions.map((permission) => permission.id);
    }

    const updatePayload = {};
    if (Object.prototype.hasOwnProperty.call(roleData, "name")) {
        updatePayload.name = roleData.name;
    }
    if (Object.prototype.hasOwnProperty.call(roleData, "description")) {
        updatePayload.description = roleData.description;
    }
    if (Object.prototype.hasOwnProperty.call(roleData, "permissions")) {
        updatePayload.permissions = permissionIds;
    }

    const updated = await RoleModel.updateWithPermissions(parsedId, updatePayload);

    return successResponse(res, 200, `Rol con ID ${id} actualizado exitosamente (PUT)`, updated);
});

// Actualización parcial de un rol (PATCH)
export const patchRoleById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const parsedId = parseRoleId(id);

    if (!parsedId) {
        return next(buildError("ID de rol inválido", 400, ["El parámetro id debe ser un número entero positivo"]));
    }

    const roleData = req.body;

    if (Object.keys(roleData).length === 0) {
        return next(buildError("Error al editar rol", 400, ["Debes enviar al menos un campo para actualizar"]));
    }

    const foundRole = await RoleModel.findById(parsedId);
    if (!foundRole) {
        return next(buildError("Rol no encontrado", 404, [`No se encontró el rol con el ID ${id}`]));
    }

    if (roleData.name && roleData.name !== foundRole.name) {
        const existingRole = await RoleModel.findByName(roleData.name);
        if (existingRole && existingRole.id !== parsedId) {
            return next(buildError("Rol duplicado", 409, [`Ya existe un rol con el nombre '${roleData.name}'`]));
        }
    }

    let permissionIds;
    if (Object.prototype.hasOwnProperty.call(roleData, "permissions")) {
        const foundPermissions = await RoleModel.findPermissionsByCodes(roleData.permissions);
        const foundCodes = new Set(foundPermissions.map((permission) => permission.code));
        const missingPermissions = roleData.permissions.filter((code) => !foundCodes.has(code));

        if (missingPermissions.length > 0) {
            return next(
                buildError(
                    "Permisos inválidos",
                    400,
                    [`No existen los siguientes permisos: ${missingPermissions.join(", ")}`]
                )
            );
        }

        permissionIds = foundPermissions.map((permission) => permission.id);
    }

    const patchPayload = {};
    if (Object.prototype.hasOwnProperty.call(roleData, "name")) {
        patchPayload.name = roleData.name;
    }
    if (Object.prototype.hasOwnProperty.call(roleData, "description")) {
        patchPayload.description = roleData.description;
    }
    if (Object.prototype.hasOwnProperty.call(roleData, "permissions")) {
        patchPayload.permissions = permissionIds;
    }

    const patched = await RoleModel.updateWithPermissions(parsedId, patchPayload);

    return successResponse(res, 200, `Rol con ID ${id} actualizado exitosamente (PATCH)`, patched);
});

// Eliminar un rol
export const deleteRoleById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const parsedId = parseRoleId(id);

    if (!parsedId) {
        return next(buildError("ID de rol inválido", 400, ["El parámetro id debe ser un número entero positivo"]));
    }

    const deleted = await RoleModel.delete(parsedId);

    if (!deleted) {
        return next(buildError("Error al eliminar rol", 404, [`No se encontró el rol con el ID ${id}`]));
    }

    return successResponse(res, 200, `Rol con ID ${id} eliminado exitosamente`, deleted);
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
