import { getAllUsers, getUser, addUser, updateUser, patchUser, deleteUser } from '../models/users.model.js';

// Consultar todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
};

// Consultar un usuario específico
export const getUserById = async (req, res) => {
  try {
    const user = await getUser(req.params.id);
    if (!user) {
      return res.status(404).json({ message: `Usuario con id ${req.params.id} no encontrado` });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
  }
};

// Crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    const { name, email, document, role } = req.body;

    if (!name || !email || !document || !role) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios: name, email, document, role' });
    }

    const newUser = await addUser({ name, email, document, role });
    res.status(201).json({ message: 'Usuario creado', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear usuario', error: error.message });
  }
};

// Actualizar completamente un usuario
export const updateUserById = async (req, res) => {
  try {
    const updated = await updateUser(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: `Usuario con id ${req.params.id} no encontrado` });
    }
    res.status(200).json({ message: 'Usuario actualizado', user: updated });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
  }
};

// Actualización parcial de un usuario
export const patchUserById = async (req, res) => {
  try {
    const patched = await patchUser(req.params.id, req.body);
    if (!patched) {
      return res.status(404).json({ message: `Usuario con id ${req.params.id} no encontrado` });
    }
    res.status(200).json({ message: 'Usuario actualizado parcialmente', user: patched });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar parcialmente el usuario', error: error.message });
  }
};

// Eliminar un usuario
export const deleteUserById = async (req, res) => {
  try {
    const deleted = await deleteUser(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: `Usuario con id ${req.params.id} no encontrado` });
    }

    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
  }
};
