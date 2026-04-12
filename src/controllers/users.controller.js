import { getAllUsers, getUser, addUser, updateUser, patchUser, deleteUser } from '../models/users.model.js';
import { successResponse } from '../utils/response.handler.js';
import { catchAsync } from '../utils/catchAsync.js';
import { buildError } from "../utils/response.handler.js";

// Consultar todos los usuarios
export const getUsers = catchAsync(async (req, res, next) => {
    const users = await getAllUsers();
    return successResponse(res, 200, "Listado de usuarios obtenido exitosamente", users);
});

// Consultar un usuario específico
export const getUserById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const user = await getUser(id);

    if (!user) {
        return next(buildError("Usuario no encontrado", 404, [`No se encontró ningún usuario con el ID ${id}`]));
    }

    return successResponse(res, 200, `Usuario con ID ${id} encontrado exitosamente`, user);
});

// Crear un nuevo usuario
export const createUser = catchAsync(async (req, res, next) => {
    const { name, email, document, role } = req.body;

    const newUser = await addUser({ name, email, document, role });
    return successResponse(res, 201, "Usuario creado exitosamente", newUser);
});

// Actualizar completamente un usuario (PUT)
export const updateUserById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const updated = await updateUser(id, req.body);

    if (!updated) {
        return next(buildError("Error al actualizar usuario", 404, [`No se encontró el usuario con el ID ${id}`]));
    }

    return successResponse(res, 200, `Usuario con ID ${id} actualizado exitosamente (PUT)`, updated);
});

// Actualización parcial de un usuario (PATCH)
export const patchUserById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const patched = await patchUser(id, req.body);

    if (!patched) {
        return next(buildError("Usuario no encontrado", 404, [`No se encontró el usuario con el ID ${id}`]));
    }

    return successResponse(res, 200, `Usuario con ID ${id} actualizado exitosamente (PATCH)`, patched);
});


// Eliminar un usuario
export const deleteUserById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const deleted = await deleteUser(id);

    if (!deleted) {
        return next(createError("Error al eliminar usuario", 404, [`No se encontró el usuario con el ID ${id}`]));
    }

    return successResponse(res, 200, `Usuario con ID ${id} eliminado exitosamente`, deleted);
});
