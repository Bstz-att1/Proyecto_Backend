import { getAllTasks, getTask, addTask, updateTask, patchTask, deleteTask } from '../models/tasks.model.js';
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

// Consultar todas las tareas
export const getTasks = catchAsync(async (req, res, next) => {
    const tasks = await getAllTasks();
    return successResponse(res, 200, "Listado de tareas obtenido exitosamente", tasks);
});

// Consultar una tarea específica
export const getTaskById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const task = await getTask(id);

    if (!task) {
        return next(createError("Tarea no encontrada", 404, [`No se encontró ninguna tarea con el ID ${id}`]));
    }

    return successResponse(res, 200, `Tarea con ID ${id} encontrada exitosamente`, task);
});

// Registrar una nueva tarea
export const createTask = catchAsync(async (req, res, next) => {
    const { user_id, title, description, status, created_by } = req.body;

    if (!user_id || !title || !description || !status || !created_by) {
        return next(createError(
            "Campos obligatorios faltantes",
            400,
            ["Debes enviar: user_id, title, description, status, created_by"]
        ));
    }

    const newTask = await addTask({ user_id, title, description, status, created_by });
    return successResponse(res, 201, "Tarea creada exitosamente", newTask);
});

// Actualizar información de una tarea (PUT)
export const updateTaskById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const updated = await updateTask(id, req.body);

    if (!updated) {
        return next(createError("Error al actualizar la tarea", 404, [`No se encontró la tarea con el ID ${id}`]));
    }

    return successResponse(res, 200, `Tarea con ID ${id} actualizada exitosamente (PUT)`, updated);
});

// Actualización parcial de una tarea (PATCH)
export const patchTaskById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const taskData = req.body;

    if (Object.keys(taskData).length === 0) {
        return next(createError("Error al editar tarea", 400, ["Debes enviar al menos un campo para actualizar"]));
    }

    const patched = await patchTask(id, taskData);

    if (!patched) {
        return next(createError("Tarea no encontrada", 404, [`No se encontró la tarea con el ID ${id}`]));
    }

    return successResponse(res, 200, `Tarea con ID ${id} actualizada exitosamente (PATCH)`, patched);
});

// Eliminar una tarea
export const deleteTaskById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const deleted = await deleteTask(id);

    if (!deleted) {
        return next(createError("Error al eliminar la tarea", 404, [`No se encontró la tarea con el ID ${id}`]));
    }

    return successResponse(res, 200, `Tarea con ID ${id} eliminada exitosamente`, deleted);
});
