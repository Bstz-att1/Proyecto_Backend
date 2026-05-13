import { Router } from 'express';
import { getRoles, getRoleById, manageRole } from '../controllers/index.js';
import { validateToken, checkPermission, validateSchema } from '../middlewares/index.js';
import { roleManagementSchema } from '../schemas/index.js';

const router = Router();

// Consultar todos los roles
router.get('/', validateToken, checkPermission('roles.get'), getRoles);

// Consultar un rol específico
router.get('/:id', validateToken, checkPermission('roles.get'), getRoleById);

// Gestión de roles con validación de schema + control RBAC
router.post(
  '/manage',
  validateToken,
  checkPermission('roles.manage'),
  validateSchema(roleManagementSchema),
  manageRole
);

export default router;
