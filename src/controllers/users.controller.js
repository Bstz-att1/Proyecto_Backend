import { getAllUsers, getUser, addUser, updateUser, patchUser, deleteUser } from '../models/users.model.js';

// Consultar todos los usuarios
export const getUsers = (req, res) => {
  try {
    const users = getAllUsers();
    res.status(200).json(users);
  } catch {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

// Consultar un usuario específico
export const getUserById = (req, res) => {
  try {
    const user = getUser(req.params.id);
    res.status(200).json(user);
  } catch {
    res.status(500).json({ message: 'Error al obtener usuario' });
  }
};

// Registrar un nuevo usuario
export const createUser = (req, res) => {
  try {
    if (!req.body.nombre) {
      return res.status(400).json({ message: 'El nombre es obligatorio' });
    }
    const newUser = addUser({ nombre: req.body.nombre });
    res.status(201).json({ message: 'Usuario creado', user: newUser });
  } catch {
    res.status(500).json({ message: 'Error al crear usuario' });
  }
};

// Actualizar información de un usuario
export const updateUserById = (req, res) => {
  try {
    const updated = updateUser(req.params.id, req.body);
    res.status(200).json({ message: 'Usuario actualizado', user: updated });
  } catch {
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
};

// PATCH → actualización parcial
export const patchUserById = async (req, res) => {
  try {
    const patched = await patchUser(req.params.id, req.body);
    res.status(200).json({ message: 'Usuario actualizado parcialmente', user: patched });
  } catch {
    res.status(500).json({ message: 'Error al actualizar parcialmente el usuario' });
  }
};

// Eliminar un usuario
export const deleteUserById = (req, res) => {
  try {
    const deleted = deleteUser(req.params.id);
    res.status(200).json({ message: 'Usuario eliminado', user: deleted });
  } catch {
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
};
