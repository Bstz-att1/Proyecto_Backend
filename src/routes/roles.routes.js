import { Router } from 'express';
import { getRoles, getRoleById, manageRole } from '../controllers/roles.controller.js';
import { validateToken } from '../middlewares/auth.middleware.js';
import { checkPermission } from '../middlewares/rbac.middleware.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { roleManagementSchema } from '../schemas/roles.schema.js';

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
