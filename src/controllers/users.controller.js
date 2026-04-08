import { getAllUsers, getUser, addUser, updateUser, patchUser, deleteUser } from '../models/users.model.js';
import { successResponse } from '../utils/response.handler.js';
import { catchAsync } from '../utils/catchAsync.js';

// Función auxiliar para crear errores operacionales con detalles
const createError = (message, statusCode, details = []) => {
    const err = new Error(message);
    err.statusCode = statusCode;
    err.isOperational = true;
    err.errors = details.length ? details : [message];
    return err;
};

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
        return next(createError("Usuario no encontrado", 404, [`No se encontró ningún usuario con el ID ${id}`]));
    }

    return successResponse(res, 200, `Usuario con ID ${id} encontrado exitosamente`, user);
});

// Crear un nuevo usuario
export const createUser = catchAsync(async (req, res, next) => {
    const { name, email, document, role } = req.body;

    if (!name || !email || !document || !role) {
        return next(createError(
            "Campos obligatorios faltantes",
            400,
            ["Debes enviar: name, email, document, role"]
        ));
    }

    const newUser = await addUser({ name, email, document, role });
    return successResponse(res, 201, "Usuario creado exitosamente", newUser);
});

// Actualizar completamente un usuario (PUT)
export const updateUserById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const updated = await updateUser(id, req.body);

    if (!updated) {
        return next(createError("Error al actualizar usuario", 404, [`No se encontró el usuario con el ID ${id}`]));
    }

    return successResponse(res, 200, `Usuario con ID ${id} actualizado exitosamente (PUT)`, updated);
});

// Actualización parcial de un usuario (PATCH)
export const patchUserById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const userData = req.body;

    if (Object.keys(userData).length === 0) {
        return next(createError("Error al editar usuario", 400, ["Debes enviar al menos un campo para actualizar"]));
    }

    const patched = await patchUser(id, userData);

    if (!patched) {
        return next(createError("Usuario no encontrado", 404, [`No se encontró el usuario con el ID ${id}`]));
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
