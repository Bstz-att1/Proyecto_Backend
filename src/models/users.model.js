// Modelo de Usuarios - Simulación según guía

export const getAllUsers = () => {
  return { message: "Consulta de todos los usuarios realizada" };
};

export const getUser = (id) => {
  return { message: `Consulta del usuario con id ${id} realizada` };
};

export const addUser = (user) => {
  return { message: `Usuario ${user.nombre} registrado correctamente` };
};

export const updateUser = (id, data) => {
  return { message: `Usuario con id ${id} actualizado completamente` };
};

// PATCH → actualización parcial
export const patchUser = (id, data) => {
  return { message: `Usuario con id ${id} actualizado parcialmente` };
};

export const deleteUser = (id) => {
  return { message: `Usuario con id ${id} eliminado correctamente` };
};
