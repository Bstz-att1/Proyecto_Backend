import { Router } from 'express';
import {
  getRoles,
  getRoleById,
  getRolePermissionsById,
  createRole,
  updateRoleById,
  patchRoleById,
  deleteRoleById,
  manageRole
} from '../controllers/index.js';
import { validateToken, checkPermission, validateSchema } from '../middlewares/index.js';
import { roleManagementSchema, roleUpdateSchema, rolePatchSchema } from '../schemas/index.js';

const router = Router();

// Consultar todos los roles
router.get('/', validateToken, checkPermission('roles.get'), getRoles);

// Consultar un rol específico
router.get('/:id', validateToken, checkPermission('roles.get'), getRoleById);

// Consultar permisos de un rol específico
router.get('/:id/permissions', validateToken, checkPermission('roles.get'), getRolePermissionsById);

// Crear un nuevo rol
router.post(
  '/',
  validateToken,
  checkPermission('roles.manage'),
  validateSchema(roleManagementSchema),
  createRole
);

// Actualizar completamente un rol
router.put(
  '/:id',
  validateToken,
  checkPermission('roles.manage'),
  validateSchema(roleUpdateSchema),
  updateRoleById
);

// Actualizar parcialmente un rol
router.patch(
  '/:id',
  validateToken,
  checkPermission('roles.manage'),
  validateSchema(rolePatchSchema),
  patchRoleById
);

// Eliminar un rol
router.delete('/:id', validateToken, checkPermission('roles.manage'), deleteRoleById);

// Gestión de roles con validación de schema + control RBAC
router.post(
  '/manage',
  validateToken,
  checkPermission('roles.manage'),
  validateSchema(roleManagementSchema),
  manageRole
);

export default router;
