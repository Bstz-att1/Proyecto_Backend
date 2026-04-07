// Modelo de Tareas

export const getAllTasks = () => {
  return { message: "Consulta de todas las tareas realizada" };
};

export const getTask = (id) => {
  return { message: `Consulta de la tarea con id ${id} realizada` };
};

export const addTask = (task) => {
  return { message: `Tarea '${task.titulo}' registrada correctamente` };
};

export const updateTask = (id, data) => {
  return { message: `Tarea con id ${id} actualizada completamente` };
};

// PATCH → actualización parcial
export const patchTask = (id, data) => {
  return { message: `Tarea con id ${id} actualizada parcialmente` };
};

export const deleteTask = (id) => {
  return { message: `Tarea con id ${id} eliminada correctamente` };
};
