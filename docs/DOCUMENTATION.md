# Backend Documentation

## Propósito general

API REST para gestión de autenticación, usuarios, roles y tareas, con validación de datos, control de acceso por permisos (RBAC), manejo centralizado de errores y conexión a MySQL mediante pool.

---

## Estructura de módulos

- `src/app.js`: inicialización del servidor y montaje de rutas/middlewares.
- `src/config/db.js`: conexión a base de datos (pool MySQL).
- `src/routes/*`: definición de endpoints y encadenamiento de middlewares.
- `src/controllers/*`: lógica HTTP de cada recurso.
- `src/models/*`: acceso a datos (consultas SQL).
- `src/middlewares/*`: autenticación, autorización, validación y errores.
- `src/schemas/*`: contratos de validación (Zod).
- `src/utils/*`: utilidades transversales (JWT, respuestas, captura async).

---

## `src/app.js`

### `app.get('/')`
Devuelve mensaje de bienvenida usando respuesta estándar de éxito.

### `app.use('/auth', authRoutes)`
Monta rutas de autenticación.

### `app.use('/users', userRoutes)`
Monta rutas de usuarios.

### `app.use('/tasks', taskRoutes)`
Monta rutas de tareas.

### `app.use('/roles', rolesRoutes)`
Monta rutas de roles.

### `app.use(globalErrorHandler)`
Middleware global para procesar cualquier error propagado por `next(error)`.

### `app.listen(PORT, callback)`
Inicia el servidor HTTP en el puerto configurado.

---

## `src/config/db.js`

### `pool` (createPool)
Crea pool de conexiones MySQL usando variables de entorno para host, credenciales y base de datos.

### `pool.getConnection().then(...).catch(...)`
Realiza prueba de conexión al arrancar; libera conexión en éxito y reporta error en consola si falla.

---

## `src/controllers/auth.controller.js`

### `loginJWT(req, res, next)`
Flujo de inicio de sesión por `document` y `password`:
1. Valida que ambos campos existan.
2. Busca usuario por documento.
3. Compara contraseña con hash (`bcrypt.compare`).
4. Consulta permisos del usuario.
5. Genera `accessToken` y `refreshToken`.
6. Guarda refresh token en base de datos.
7. Responde con tokens + perfil base + permisos.

### `refreshJWT(req, res, next)`
Renueva sesión con refresh token:
1. Exige `refreshToken` en body.
2. Verifica firma/estado del token con secreto de refresh.
3. Busca usuario dueño del refresh token.
4. Valida tipo de token (`refresh`).
5. Reemite access/refresh tokens con versión actual de token.
6. Persiste nuevo refresh token.
7. Retorna nuevos tokens.

### `logout(req, res, next)`
Cierra sesión y revoca credenciales:
1. Toma `refreshToken` (body) y/o `userId` del access token.
2. Determina usuario objetivo.
3. Revoca refresh token en DB.
4. Incrementa `token_version` para invalidar access tokens previos.
5. Responde confirmación de cierre de sesión.

---

## `src/controllers/roles.controller.js`

### `parseRoleId(id)`
Convierte y valida `id` como entero positivo; retorna `null` si no cumple formato.

### `getRoles(req, res, next)`
Obtiene y retorna todos los roles.

### `getRoleById(req, res, next)`
Valida `id`, consulta rol por ID y responde encontrado/no encontrado.

### `getRolePermissionsById(req, res, next)`
Valida `id`, verifica existencia del rol y retorna permisos asignados al rol.

### `createRole(req, res, next)`
Crea rol con permisos:
1. Valida no duplicidad de nombre.
2. Verifica que todos los códigos de permisos existan.
3. Crea rol + relaciones de permisos en transacción.
4. Devuelve rol creado.

### `updateRoleById(req, res, next)`
Actualización completa (PUT) de rol:
1. Valida ID y body no vacío.
2. Verifica existencia del rol.
3. Valida duplicidad de nombre si cambia.
4. Valida permisos si se envían.
5. Actualiza campos y sincroniza permisos.
6. Devuelve rol actualizado.

### `patchRoleById(req, res, next)`
Actualización parcial (PATCH) de rol:
1. Valida ID y body no vacío.
2. Verifica existencia del rol.
3. Valida duplicidad de nombre si cambia.
4. Valida permisos si se envían.
5. Aplica cambios parciales y sincroniza permisos si corresponde.
6. Devuelve rol actualizado.

### `deleteRoleById(req, res, next)`
Valida ID, elimina rol por ID y responde resultado.

### `manageRole(req, res, next)`
Endpoint de validación/eco de payload de rol para flujos de arquitectura/RBAC; retorna datos validados.

---

## `src/controllers/tasks.controller.js`

### `getTasks(req, res, next)`
Consulta y retorna todas las tareas.

### `getTaskById(req, res, next)`
Consulta tarea por ID y responde 404 si no existe.

### `createTask(req, res, next)`
Inserta nueva tarea con campos del body y retorna registro creado.

### `updateTaskById(req, res, next)`
Reemplaza datos de tarea (PUT); retorna 404 si no existe.

### `patchTaskById(req, res, next)`
Actualiza parcialmente tarea (PATCH); exige al menos un campo y retorna 404 si no existe.

### `deleteTaskById(req, res, next)`
Elimina tarea por ID; retorna 404 si no existe.

---

## `src/controllers/users.controller.js`

### `getUsers(req, res, next)`
Obtiene listado de usuarios (sin datos sensibles).

### `getUserById(req, res, next)`
Obtiene usuario por ID; retorna 404 si no existe.

### `createUser(req, res, next)`
Crea usuario:
1. Obtiene rol por nombre.
2. Retorna error si rol no existe.
3. Hashea contraseña con bcrypt.
4. Crea usuario y asigna rol en transacción.
5. Retorna usuario creado.

### `updateUserById(req, res, next)`
Actualiza usuario completo (PUT); retorna 404 si no existe.

### `patchUserById(req, res, next)`
Actualiza usuario parcial (PATCH); exige body no vacío y retorna 404 si no existe.

### `deleteUserById(req, res, next)`
Elimina usuario por ID; retorna 404 si no existe.

---

## `src/models/roles.model.js` (`RoleModel`)

### `findAll()`
Retorna todos los roles ordenados por ID.

### `findById(id)`
Retorna rol por ID o `null`.

### `findByName(name)`
Retorna rol por nombre o `null`.

### `findPermissionsByCodes(permissionCodes)`
Recibe códigos de permisos y retorna los existentes (`id`, `code`).

### `create(roleData)`
Inserta un rol y retorna el registro creado.

### `createWithPermissions(roleData)`
Crea rol y asigna permisos en transacción (`roles` + `role_permissions`).

### `update(id, roleData)`
Actualiza campos de rol enviados; si no hay campos, retorna rol actual.

### `updateWithPermissions(id, roleData)`
Actualiza rol y sincroniza permisos en transacción:
- actualiza campos base (`name`, `description`) si existen.
- reemplaza asignaciones en `role_permissions` si se envía `permissions`.

### `delete(id)`
Elimina rol por ID y devuelve rol eliminado; `null` si no existe.

### `findPermissionsByRoleId(roleId)`
Retorna permisos asociados a un rol.

### `getPermissionsByUserId(userId)`
Obtiene permisos efectivos de un usuario por relación `users -> user_roles -> roles -> role_permissions -> permissions`.

---

## `src/models/tasks.model.js`

### `addTask(task)`
Inserta una tarea y retorna objeto de tarea creada (con metadato `created: true`).

### `getAllTasks()`
Obtiene todas las tareas y normaliza estructura de salida.

### `getTask(id)`
Obtiene una tarea por ID o `null`.

### `updateTask(id, data)`
Actualiza tarea completa (PUT), retorna tarea actualizada con `updated: true` o `null`.

### `patchTask(id, data)`
Actualiza tarea parcial (PATCH) fusionando datos previos + nuevos; retorna actualizada o `null`.

### `deleteTask(id)`
Elimina tarea por ID; retorna `{ id, deleted: true }` o `null`.

---

## `src/models/users.model.js` (`UserModel`)

### `getAll()`
Obtiene usuarios sin contraseña ni refresh token.

### `findById(id)`
Obtiene usuario público por ID.

### `findByDocument(document)`
Obtiene usuario por documento, incluyendo `password_hash` y `token_version` para autenticación.

### `findByIdWithTokenVersion(id)`
Obtiene usuario incluyendo `token_version` para validar sesiones activas.

### `update(id, data)`
Actualiza usuario con mapeo automático de campos (`SET ?`).

### `delete(id)`
Elimina usuario; retorna booleano de éxito.

### `create(newUser)`
Crea usuario y asigna rol en tabla `user_roles` dentro de transacción.

### `updateRefreshToken(userId, refresh_token)`
Guarda refresh token activo del usuario.

### `findByRefreshToken(refresh_token)`
Busca usuario asociado a refresh token.

### `revokeRefreshToken(userId)`
Limpia refresh token del usuario (`NULL`).

### `incrementTokenVersion(userId)`
Incrementa versión de token para invalidar access tokens emitidos anteriormente.

---

## `src/middlewares/auth.middleware.js`

### `validateToken(req, res, next)`
Middleware de autenticación JWT:
1. Extrae token Bearer del header `Authorization`.
2. Rechaza si no existe token.
3. Verifica firma/estado del token.
4. Exige token de tipo `access`.
5. Compara `tokenVersion` del token con DB.
6. Inyecta usuario autenticado en `req.user`.
7. Continúa al siguiente middleware/controlador.

---

## `src/middlewares/rbac.middleware.js`

### `checkPermission(requiredPermission)`
Factory de middleware RBAC:
1. Lee `req.user.userId`.
2. Obtiene permisos efectivos del usuario.
3. Normaliza a códigos de permiso.
4. Verifica presencia de `requiredPermission`.
5. Rechaza con `403` si no tiene permiso; de lo contrario continúa.

---

## `src/middlewares/validator.middleware.js`

### `validateSchema(schema)`
Factory de middleware de validación Zod:
1. Ejecuta `schema.safeParse(req.body)`.
2. Si falla, traduce errores a estructura legible por campo.
3. Propaga error operacional `400`.
4. Si pasa, reemplaza `req.body` por datos validados/sanitizados.

---

## `src/middlewares/error.middleware.js`

### `globalErrorHandler(err, req, res, next)`
Middleware global de errores:
1. Determina `statusCode` e identifica si error es operacional.
2. Registra error en consola (stack para no operacionales).
3. Retorna respuesta estandarizada de error con mensaje y detalles.

---

## `src/utils/catchAsync.js`

### `catchAsync(fn)`
Wrapper para controladores/middlewares async; redirige errores a `next` sin `try/catch` repetitivo.

---

## `src/utils/jwt.handler.js`

### `generateToken(payload)`
Firma JWT con secreto principal y expiración configurable.

### `verifyJWT(token, secret)`
Verifica token y retorna:
- `{ valid: true, decoded }` si es válido.
- `{ valid: false, message }` si es inválido/expirado.

---

## `src/utils/response.handler.js`

### `successResponse(res, statusCode, message, data = [])`
Estandariza respuestas exitosas (`success: true`).

### `errorResponse(res, statusCode, message, errors = [])`
Estandariza respuestas de error (`success: false`).

### `buildError(message, statusCode, details = [])`
Crea error operacional con código HTTP y arreglo de detalles.

### `buildUnauthorizedError(detail)`
Atajo para construir error `401` con mensaje base de autorización.

---

## `src/routes/auth.routes.js`

### `POST /auth/login`
Autenticación por documento/contraseña y emisión de tokens.

### `POST /auth/refresh`
Renovación de access token usando refresh token.

### `POST /auth/logout`
Cierre de sesión con revocación de tokens; requiere `validateToken`.

---

## `src/routes/users.routes.js`

### `GET /users`
Requiere `users.get`; lista usuarios.

### `GET /users/:id`
Requiere `users.get`; consulta usuario por ID.

### `POST /users`
Requiere `users.create`; valida payload con `userSchema`; crea usuario.

### `PUT /users/:id`
Requiere `users.update`; valida `userSchema`; actualiza usuario completo.

### `PATCH /users/:id`
Requiere `users.update`; valida `userSchema.partial()`; actualiza usuario parcial.

### `DELETE /users/:id`
Requiere `users.delete`; elimina usuario.

---

## `src/routes/tasks.routes.js`

### `GET /tasks`
Requiere `tasks.get`; lista tareas.

### `GET /tasks/:id`
Requiere `tasks.get`; consulta tarea por ID.

### `POST /tasks`
Requiere `tasks.create`; valida `taskSchema`; crea tarea.

### `PUT /tasks/:id`
Requiere `tasks.update`; valida `taskSchema`; actualiza tarea completa.

### `PATCH /tasks/:id`
Requiere `tasks.update`; valida `taskSchema.partial()`; actualiza tarea parcial.

### `DELETE /tasks/:id`
Requiere `tasks.delete`; elimina tarea.

---

## `src/routes/roles.routes.js`

### `GET /roles`
Requiere `roles.get`; lista roles.

### `GET /roles/:id`
Requiere `roles.get`; consulta rol por ID.

### `GET /roles/:id/permissions`
Requiere `roles.get`; lista permisos del rol.

### `POST /roles`
Requiere `roles.manage`; valida `roleManagementSchema`; crea rol.

### `PUT /roles/:id`
Requiere `roles.manage`; valida `roleUpdateSchema`; actualiza rol completo.

### `PATCH /roles/:id`
Requiere `roles.manage`; valida `rolePatchSchema`; actualiza rol parcial.

### `DELETE /roles/:id`
Requiere `roles.manage`; elimina rol.

### `POST /roles/manage`
Requiere `roles.manage`; valida `roleManagementSchema`; endpoint de gestión/validación de payload.

---

## `src/schemas/users.schema.js`

### `userSchema`
Contrato de validación para usuarios:
- `name`: string mínimo 3.
- `email`: formato email válido.
- `document`: string mínimo 4.
- `password`: string mínimo 6.
- `role`: string normalizado a mayúsculas y restringido a `ADMIN | SUPERVISOR | USER`.

---

## `src/schemas/tasks.schema.js`

### `taskSchema`
Contrato de validación para tareas:
- `user_id`: número obligatorio.
- `title`: string mínimo 10.
- `description`: string mínimo 5.
- `status`: uno de `pendiente | en progreso | completada`.
- `created_by`: uno de `admin | user`.

---

## `src/schemas/roles.schema.js`

### `roleNameSchema`
Valida nombre de rol (string, trim, longitud 3..50).

### `roleDescriptionSchema`
Valida descripción opcional (string hasta 255 o vacío).

### `permissionCodeSchema`
Valida código de permiso con patrón `recurso.accion`.

### `permissionsSchema`
Valida arreglo no vacío de códigos de permiso.

### `roleManagementSchema`
Schema para creación/gestión de rol (`name`, `description`, `permissions`).

### `roleUpdateSchema`
Schema para actualización de rol (`name?`, `description`, `permissions?`).

### `rolePatchSchema`
Alias de `roleUpdateSchema` para uso en PATCH.

---

## Archivos índice (re-export)

### `src/controllers/index.js`
Centraliza exportación de controladores.

### `src/models/index.js`
Centraliza exportación de modelos y funciones de tareas.

### `src/middlewares/index.js`
Centraliza exportación de middlewares.

### `src/schemas/index.js`
Centraliza exportación de schemas.

### `src/utils/index.js`
Centraliza exportación de utilidades.
