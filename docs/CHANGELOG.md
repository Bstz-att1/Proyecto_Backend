# Changelog


## [v1.2.0] - 2026-04-06
### Added
- Implementación de **CRUD completo** en usuarios y tareas:
  - Registrar nuevos usuarios y tareas (POST).
  - Consultar todos los usuarios/tareas (GET).
  - Consultar un usuario/tarea específico (GET /:id).
  - Actualizar información completa (PUT).
  - Actualizar información parcial (PATCH).
  - Eliminar usuarios/tareas (DELETE).
- Nuevas rutas en Express para usuarios y tareas:
  - `/api/users` y `/api/tasks` con soporte para GET, POST, PUT, PATCH, DELETE.
- Controladores actualizados para manejar validaciones y códigos de estado HTTP adecuados:
  - 200 → OK
  - 201 → Created
  - 500 → Error del servidor

### Changed
- Los modelos ahora simulan operaciones CRUD devolviendo mensajes descriptivos, en lugar de lógica de base de datos.
- Se amplió la separación de responsabilidades: rutas → controladores → modelos.

### Version
- `v1.0.0` → Inicio del backend con servidor básico y rutas directas.
- `v1.1.0` → Separación de rutas y creación de controladores.
- `v1.2.0` → CRUD completo con soporte para PATCH en usuarios y tareas.

----------------------------------------------------------------------------------------------------------------------------

## [v1.3.1] - 2026-04-07
### Added
- Manejo uniforme de errores **404** en usuarios y tareas:
  - Los modelos (`getUser`, `updateUser`, `patchUser`, `deleteUser`, `getTask`, `updateTask`, `patchTask`, `deleteTask`) ahora devuelven `null` cuando el recurso no existe.
  - Los controladores interpretan `null` y responden con **404 Not Found**.
- Ajustes en el servidor para centralizar el manejo de errores y diferenciar entre:
  - **404 Not Found** → recurso inexistente.
  - **500 Internal Server Error** → fallos internos de base de datos o ejecución.
- Documentación mejorada en controladores con mensajes más descriptivos para cada operación.

### Changed
- Se corrigió la lógica de validación en controladores de usuarios y tareas para evitar respuestas ambiguas.
- Se unificó el flujo de errores en todos los endpoints, garantizando consistencia entre módulos.
- Se actualizó la estructura de mensajes de respuesta para mejorar la experiencia de pruebas en Postman y facilitar la depuración.

### Fixed
- Corrección de respuestas incorrectas en operaciones PUT/PATCH/DELETE cuando el recurso no existía (antes devolvían 200 o mensajes genéricos).
- Ajustes en los modelos para que reflejen fielmente el estado de la base de datos y no simulen resultados inexistentes.

### Version
- `v1.0.0` → Inicio del backend con servidor básico y rutas directas.  
- `v1.1.0` → Separación de rutas y creación de controladores.  
- `v1.2.0` → CRUD completo con soporte para PATCH en usuarios y tareas.  
- `v1.3.1` → Manejo uniforme de errores 404, correcciones en modelos y controladores, servidor más robusto y respuestas consistentes.  

-----------------------------------------------------------------------------------------------------------------------------

## [v1.4.0] - 2026-04-07
### Added
- Implementación de **middleware global de errores** (`globalErrorHandler`) para centralizar el manejo de fallos en toda la API.
- Integración de utilidades `successResponse` y `errorResponse` para estandarizar las respuestas de éxito y error.
- Configuración de **CORS** y `express.urlencoded` en `app.js` para mejorar compatibilidad con clientes frontend y formularios.
- Documentación más descriptiva en controladores para cada operación.

### Changed
- Controladores ajustados para usar `next(error)` en casos de fallo, delegando la respuesta al middleware global.
- Modelos actualizados para devolver `null` cuando el recurso no existe, en lugar de simular datos.
- Flujo de errores unificado en todos los endpoints, garantizando consistencia entre módulos.
- Estructura de mensajes de respuesta mejorada para pruebas en Postman y depuración.

### Fixed
- Corrección de respuestas incorrectas en operaciones PUT/PATCH/DELETE cuando el recurso no existía (antes devolvían 200 o mensajes genéricos).
- Ajustes en los modelos para reflejar fielmente el estado de la base de datos y evitar resultados inexistentes.

### Version
- `v1.0.0` → Inicio del backend con servidor básico y rutas directas.  
- `v1.1.0` → Separación de rutas y creación de controladores.  
- `v1.2.0` → CRUD completo con soporte para PATCH en usuarios y tareas.
- `v1.3.1` → Manejo uniforme de errores 404, correcciones en modelos y controladores, servidor más robusto y respuestas consistentes.  
- `v1.4.0` → Middleware global de errores, controladores y modelos ajustados, servidor más robusto y respuestas consistentes.  

-----------------------------------------------------------------------------------------------------------------------------

## [v1.4.1] - 2026-04-08

### Refactor
- **tasks.model.js**
  - Normalización de objetos devueltos en todas las operaciones CRUD.
  - Inclusión de flags `created`, `updated`, `deleted` para enriquecer las respuestas en controladores.
  - Uso de `??` en `patchTask` para soportar valores falsy (`0`, `""`).
  - Consistencia en retornos: todos los métodos devuelven datos o `null`.

- **users.model.js**
  - Ajuste similar al modelo de tareas para mantener consistencia.
  - Flags `created`, `updated`, `deleted` añadidos en operaciones CRUD.
  - Uso de `??` en `patchUser` para soportar valores falsy.
  - Eliminación de mensajes directos en el modelo, delegando al controlador.

### Controllers
- **tasks.controller.js**
  - Refactor completo para usar `catchAsync` y `successResponse`.
  - Implementación de `createError` para errores operacionales con detalles.
  - Mensajes de respuesta más completos y descriptivos.
  - Centralización de errores en el middleware global.

- **users.controller.js**
  - Refactor completo para alinearse con el controlador de tareas.
  - Uso de `catchAsync`, `successResponse` y `createError`.
  - Validaciones de campos obligatorios con mensajes claros.
  - Respuestas enriquecidas y consistentes en todos los endpoints.

### Middleware
- Integración total con `catchAsync` y `globalErrorHandler`.
- Eliminación de `try/catch` repetitivos en controladores.
- Flujo de errores uniforme en toda la API.

### Version
- `v1.0.0` → Inicio del backend con servidor básico y rutas directas.  
- `v1.1.0` → Separación de rutas y creación de controladores.  
- `v1.2.0` → CRUD completo con soporte para PATCH en usuarios y tareas.
- `v1.3.1` → Manejo uniforme de errores 404, correcciones en modelos y controladores, servidor más robusto y respuestas consistentes.  
- `v1.4.0` → Middleware global de errores, controladores y modelos ajustados, servidor más robusto y respuestas consistentes.  
- `v1.4.1` → Refactor de modelos y controladores de usuarios y tareas.  

-----------------------------------------------------------------------------------------------------------------------------

## [v1.4.2] - 2026-04-18
### Changed
- Actualización de datos semilla en `sql/data.sql` para fortalecer pruebas funcionales:
  - Se ampliaron los usuarios de prueba hasta completar **20 registros**.
  - Se consolidaron tareas para garantizar **5 tareas por cada usuario** creado.
- Se ajustaron títulos y descripciones de tareas para mantener coherencia con el estilo funcional usado en ejemplos iniciales:
  - Autenticación, dashboard, sprint, validaciones, reportes, rendimiento, documentación, QA y accesibilidad.
- Se conservaron columnas y estructura SQL existentes:
  - `tasks(user_id, title, description, status, created_by)`
  - Estados válidos: `pendiente`, `en progreso`, `completada`.
  - Roles en `created_by`: `admin`, `user`.

### Notes
- No se modificó el esquema de base de datos, únicamente el contenido semilla.
- La actualización facilita validaciones de frontend/backend con mayor volumen y casos más realistas.

### Version
- `v1.0.0` → Inicio del backend con servidor básico y rutas directas.  
- `v1.1.0` → Separación de rutas y creación de controladores.  
- `v1.2.0` → CRUD completo con soporte para PATCH en usuarios y tareas.
- `v1.3.1` → Manejo uniforme de errores 404, correcciones en modelos y controladores, servidor más robusto y respuestas consistentes.  
- `v1.4.0` → Middleware global de errores, controladores y modelos ajustados, servidor más robusto y respuestas consistentes.  
- `v1.4.1` → Refactor de modelos y controladores de usuarios y tareas.
- `v1.4.2` → Ampliación y normalización de datos semilla en `sql/data.sql` con 5 tareas por usuario y contenido descriptivo coherente.  


## [v1.4.3] - 2026-04-18

### Refactor
- **Modelos de backend normalizados** para mantener respuestas CRUD más consistentes en `tasks.model.js` y `users.model.js`.
- Se estandarizó el uso de banderas de operación:
  - `created: true` en creación.
  - `updated: true` en actualización total/parcial.
  - `deleted: true` en eliminación.
- Se reforzó la lógica de actualización parcial (`PATCH`) mediante el operador `??` para preservar valores válidos falsy (`0`, `""`, `false`) cuando aplique.

### Changed
- **tasks.model.js**
  - `addTask` ahora prioriza retorno desde base de datos (`SELECT` posterior al `INSERT`) e incluye metadatos (`created_at`, `updated_at`) cuando están disponibles.
  - `getAllTasks`, `updateTask` y `patchTask` devuelven estructuras homogéneas con campos completos de tarea.
  - `deleteTask` mantiene contrato explícito de eliminación con `{ id, deleted: true }` o `null` si no existe.
  
### Notes
- Esta versión documenta ajustes internos de consistencia en modelos y no introduce cambios de rutas.
- El objetivo principal fue mejorar trazabilidad, legibilidad y estabilidad del flujo de datos entre modelo y controlador.

### Version
- `v1.0.0` → Inicio del backend con servidor básico y rutas directas.  
- `v1.1.0` → Separación de rutas y creación de controladores.  
- `v1.2.0` → CRUD completo con soporte para PATCH en usuarios y tareas.
- `v1.3.1` → Manejo uniforme de errores 404, correcciones en modelos y controladores, servidor más robusto y respuestas consistentes.  
- `v1.4.0` → Middleware global de errores, controladores y modelos ajustados, servidor más robusto y respuestas consistentes.  
- `v1.4.1` → Refactor de modelos y controladores de usuarios y tareas.
- `v1.4.2` → Ampliación y normalización de datos semilla en `sql/data.sql` con 5 tareas por usuario y contenido descriptivo coherente.
- `v1.4.3` → Normalización de respuestas en modelos de backend y mejoras de consistencia en operaciones CRUD/PATCH.

-----------------------------------------------------------------------------------------------------------------------------

## [v1.4.4] - 2026-04-29

### Changed
- **sql/database.sql**
  - Actualización del esquema de `users` para alinear autenticación JWT con backend.
  - Inclusión/normalización de columnas requeridas por el flujo de auth:
    - `password_hash`
    - `refresh_token`

- **sql/data.sql**
  - Actualización de inserts de usuarios para usar `password_hash` y mantener compatibilidad con login.
  - Ajuste de consistencia entre datos semilla y esquema actual.

- **src/controllers/users.controller.js**
  - Correcciones críticas de ejecución:
    - Reemplazo de funciones inexistentes por métodos reales de `UserModel`.
    - Corrección de variable no definida en PATCH (`userData`).
    - Reemplazo de `createError` por `buildError` para consistencia con utilidades de respuesta.
    - Unificación de imports y flujo de errores en todo el controlador.

- **src/models/users.model.js**
  - Eliminación de import inválido/no usado (`zod/locales`) que podía provocar fallo de carga del módulo.

### Fixed
- Errores de runtime en módulo de usuarios por:
  - funciones no definidas,
  - variable no declarada,
  - import inválido.

### Notes
- No se ejecutaron pruebas por decisión explícita del usuario.
- Cambios enfocados en corregir funcionamiento y consistencia del backend.

### Version
- `v1.0.0` → Inicio del backend con servidor básico y rutas directas.  
- `v1.1.0` → Separación de rutas y creación de controladores.  
- `v1.2.0` → CRUD completo con soporte para PATCH en usuarios y tareas.
- `v1.3.1` → Manejo uniforme de errores 404, correcciones en modelos y controladores, servidor más robusto y respuestas consistentes.  
- `v1.4.0` → Middleware global de errores, controladores y modelos ajustados, servidor más robusto y respuestas consistentes.  
- `v1.4.1` → Refactor de modelos y controladores de usuarios y tareas.
- `v1.4.2` → Ampliación y normalización de datos semilla en `sql/data.sql` con 5 tareas por usuario y contenido descriptivo coherente.
- `v1.4.3` → Normalización de respuestas en modelos de backend y mejoras de consistencia en operaciones CRUD/PATCH.
- `v1.4.4` → Ajustes de BD/datos para autenticación y fixes críticos en users controller/model.

-----------------------------------------------------------------------------------------------------------------------------

## [v1.5.0] - 2026-05-13

### Added
- Implementación de la nueva capa de acceso a datos para roles en `src/models/roles.model.js`.
- Creación de `RoleModel` con métodos base de lectura:
  - `findAll()` para listar roles.
  - `findById(id)` para consultar un rol específico.
- Implementación de `getPermissionsByUserId(userId)` para obtener permisos efectivos de un usuario en tiempo real mediante SQL con múltiples `JOIN`:
  - `users -> user_roles -> roles -> role_permissions -> permissions`.
- Documentación JSDoc en todos los métodos del modelo de roles (parámetros y tipo de retorno).

### Changed
- Se estandarizó el acceso a datos de roles usando el mismo patrón de modelos existente (`pool.query` + métodos async).
- El método `getPermissionsByUserId` retorna un arreglo limpio de strings:
  - Sin valores nulos.
  - Sin valores vacíos.
  - Sin permisos duplicados (uso de `DISTINCT` en SQL).

### Notes
- Esta versión marca el inicio de la rama funcional `v1.5.0` para gestión de roles y permisos en backend.

-----------------------------------------------------------------------------------------------------------------------------

## [v1.5.1] - 2026-05-13

### Added
- Creación del controlador de roles en `src/controllers/roles.controller.js`.
- Nuevos endpoints HTTP para gestión de roles:
  - `GET /roles` para listar todos los roles.
  - `GET /roles/:id` para consultar el detalle de un rol por ID.

### Changed
- El flujo de respuestas del nuevo módulo de roles quedó alineado al estándar JSON de la API (v1.4.3) mediante `successResponse`.
- El manejo de errores en controladores de roles se implementó con `buildError` y delegación al middleware global.
- Todo el controlador de roles se encapsuló con `catchAsync` para manejo consistente de errores asíncronos.

### Notes
- Se implementó validación de `id` como entero positivo en `GET /roles/:id`:
  - `400 Bad Request` para IDs inválidos.
  - `404 Not Found` cuando el rol no existe.
- Esta versión se enfoca en exponer la capa HTTP de roles para habilitar integración futura con panel frontend de administración de accesos.

-----------------------------------------------------------------------------------------------------------------------------

## [v1.5.2] - 2026-05-13

### Added
- Nuevo middleware RBAC en `src/middlewares/rbac.middleware.js`:
  - Se implementó `checkPermission(requiredPermission)` para validar permisos por ruta.
  - Lectura de identidad desde `req.user.userId` (inyectado por `validateToken`).
  - Consulta de permisos efectivos por usuario usando `RoleModel.getPermissionsByUserId(userId)`.
  - Adjunta `req.user.permissions` para reutilización en el flujo de request.
- Nuevo schema de validación para gestión de roles en `src/schemas/roles.schema.js`:
  - `roleManagementSchema` con validaciones de:
    - `name` (string, mínimo/máximo, trim).
    - `description` (opcional, string, longitud máxima).
    - `permissions` (array obligatorio de códigos con formato `recurso:accion`).

### Changed
- `src/routes/roles.routes.js` ahora integra seguridad por capas sin romper el flujo existente de autenticación:
  - `GET /roles` y `GET /roles/:id` protegidos con `validateToken` + `checkPermission('roles:read')`.
  - Nuevo endpoint `POST /roles/manage` con:
    - `validateToken`
    - `checkPermission('roles:manage')`
    - `validateSchema(roleManagementSchema)`
- `src/controllers/roles.controller.js` incorpora `manageRole` para recibir datos ya validados por schema y responder de forma estandarizada.

### Notes
- El middleware RBAC retorna **403 Forbidden** cuando el usuario autenticado no posee el permiso requerido.
- La validación por schema se ejecuta antes del controlador para garantizar integridad de entrada en la gestión de roles.
- Se mantiene nomenclatura en camelCase y modularidad por responsabilidad (routes/middlewares/schemas/controllers).

-----------------------------------------------------------------------------------------------------------------------------

## [v1.5.5] - 2026-05-16

### Added
- Nuevo util centralizado para respuestas de no autenticado en `src/utils/response.handler.js`:
  - `buildUnauthorizedError(detail)` para estandarizar errores **401** con mensaje general reutilizable.
- Exportación del nuevo util en `src/utils/index.js` para consumo transversal en middlewares y controladores.
- Nuevo método en `src/models/roles.model.js`:
  - `findByName(name)` para resolver roles por nombre y soportar asignación dinámica al crear usuarios.
- Nuevos métodos en `src/models/users.model.js` para control de sesión:
  - `findByIdWithTokenVersion(id)` para validar sesión activa contra base de datos.
  - `incrementTokenVersion(userId)` para invalidar access tokens emitidos previamente.

### Changed
- `src/controllers/users.controller.js`:
  - `createUser` ahora:
    - recibe `role` desde el body,
    - resuelve el rol real en BD con `RoleModel.findByName`,
    - valida existencia del rol,
    - hashea `password` con `bcryptjs`,
    - crea usuario pasando `role_id`.
- `src/models/users.model.js`:
  - `create(newUser)` fue reforzado con transacción:
    - inserta en `users`,
    - asigna rol en `user_roles`,
    - confirma con `commit` y hace rollback ante error.
  - `findByDocument` ahora también retorna `token_version` para emisión de JWT versionados.
- `src/schemas/users.schema.js`:
  - `role` normalizado a mayúsculas y validado contra catálogo real:
    - `ADMIN`, `SUPERVISOR`, `USER`.
  - Inclusión de `password` como campo obligatorio con validación mínima.
- `src/controllers/auth.controller.js`:
  - `logout` protegido contra body indefinido (`req.body || {}`) para evitar errores 500 por destructuring.
  - `logout` ahora revoca `refresh_token` e incrementa `token_version` para cortar sesión activa.
  - `loginJWT` y `refreshJWT` emiten tokens incluyendo `tokenVersion`.
- `src/middlewares/auth.middleware.js`:
  - Reemplazo de errores 401 repetidos por `buildUnauthorizedError`.
  - Validación adicional de sesión:
    - compara `decoded.tokenVersion` del access token contra `users.token_version` en BD.
    - bloquea tokens viejos tras logout.
- `src/middlewares/rbac.middleware.js`:
  - uso de `buildUnauthorizedError` cuando falta identidad de usuario en request.
- `sql/database.sql`:
  - se añadió columna `token_version INT NOT NULL DEFAULT 0` en `users`.
  - se agregó migración segura para esquemas existentes:
    - `ALTER TABLE users ADD COLUMN IF NOT EXISTS token_version INT NOT NULL DEFAULT 0;`

### Fixed
- Error al crear usuario por `password_hash` nulo al no mapear contraseña desde el controlador.
- Inconsistencia de validación de roles (antes limitada a `admin/user`) frente al catálogo real en BD.
- Error de servidor al hacer logout sin body/refresh token (`Cannot destructure ... of req.body`).
- Falta de invalidación inmediata de access token después de logout.
- Duplicación de mensajes 401 en middlewares, ahora centralizados en util compartido.

-----------------------------------------------------------------------------------------------------------------------------

## [v1.5.5] - 2026-05-16

### Changed
- **src/middlewares/auth.middleware.js**
  - Se fortaleció la validación del access token usando secreto explícito:
    - de `verifyJWT(token)`
    - a `verifyJWT(token, process.env.JWT_SECRET)`.
  - Objetivo: evitar validaciones ambiguas y asegurar consistencia en la verificación de JWT protegidos.

- **src/routes/auth.routes.js**
  - Se protegió `POST /auth/logout` con `validateToken` para garantizar identidad autenticada durante el cierre de sesión:
    - `router.post('/logout', validateToken, logout)`.

- **src/controllers/auth.controller.js**
  - Se robusteció `logout` para invalidación confiable de sesión:
    - mantiene flujo por `refreshToken` cuando está presente,
    - agrega fallback por identidad autenticada (`req.user?.userId`) para invalidar sesión incluso si no coincide/no llega refresh token,
    - revoca `refresh_token` e incrementa `token_version` sobre el usuario objetivo.

### Fixed
- Caso donde, tras ejecutar logout, la sesión podía permanecer activa y permitir acceso a endpoints protegidos.
- Falta de invalidación efectiva cuando el logout dependía únicamente de encontrar coincidencia por `refreshToken`.

-----------------------------------------------------------------------------------------------------------------------------

## [v1.5.6] - 2026-05-16

### Added
- Se incorporó documentación básica en forma de comentarios funcionales en módulos clave de autenticación y autorización:
  - `src/controllers/auth.controller.js`
  - `src/middlewares/rbac.middleware.js`
  - `src/models/roles.model.js`
- En el login se añadió retorno explícito de permisos del usuario autenticado en formato descriptivo:
  - `user.permissions` con estructura `{ code, description }`.

### Changed
- **src/models/roles.model.js**
  - `getPermissionsByUserId(userId)` ahora retorna objetos con metadatos del permiso en lugar de solo strings:
    - antes: `["roles:read", "roles:manage"]`
    - ahora: `[{ code: "roles:read", description: "..." }, ...]`
  - Consulta SQL ajustada para traer `p.code` y `p.description`.
- **src/controllers/auth.controller.js**
  - `loginJWT` ahora consulta permisos efectivos del usuario con `RoleModel.getPermissionsByUserId(user.id)`.
  - La respuesta de login incluye permisos junto con los datos del usuario:
    - `id`, `name`, `email`, `permissions`.
  - Se añadieron comentarios de guía para `loginJWT`, `refreshJWT` y `logout`.
- **src/middlewares/rbac.middleware.js**
  - Se adaptó la validación RBAC para mantener compatibilidad con el nuevo formato de permisos:
    - extrae códigos con `permissions.map(permission => permission.code)`
    - valida acceso contra `requiredPermission` usando el arreglo de códigos.
  - Se conserva `req.user.permissions` con estructura completa para trazabilidad.

-----------------------------------------------------------------------------------------------------------------------------

## [v1.5.7] - 2026-05-16

### Added
- Implementación de CRUD extendido para roles con soporte completo en capa HTTP:
  - `POST /roles`
  - `PUT /roles/:id`
  - `PATCH /roles/:id`
  - `DELETE /roles/:id`
- Nuevo endpoint para consultar permisos de un rol específico:
  - `GET /roles/:id/permissions`
- Nuevo método en modelo de roles:
  - `findPermissionsByRoleId(roleId)` para resolver permisos por rol desde `role_permissions`.
- Exportación de `getRolePermissionsById` en `src/controllers/index.js`.

### Changed
- **src/schemas/roles.schema.js**
  - Se corrigió el formato de validación de permisos a convención real:
    - de `recurso:accion`
    - a `recurso.accion`.
  - Se añadieron/ajustaron esquemas para update de roles:
    - `roleUpdateSchema`
    - `rolePatchSchema`
  - Ambos esquemas permiten actualización parcial (estilo patch-like), incluyendo `permissions`.
- **src/routes/roles.routes.js**
  - Se ampliaron rutas protegidas de roles con `validateToken` + `checkPermission(...)`:
    - altas, edición, eliminación y consulta de permisos por rol.
  - Se mantuvo `POST /roles/manage` para validación guiada por schema.
- **src/models/roles.model.js**
  - Se agregó `updateWithPermissions(id, roleData)` con transacción:
    - actualiza datos básicos del rol (`name`, `description`) cuando se envían,
    - sincroniza permisos en `role_permissions` (reemplazo controlado),
    - `commit/rollback` para consistencia transaccional.
  - Se conservan métodos previos de consulta y creación con permisos.
- **src/controllers/roles.controller.js**
  - `createRole` valida códigos de permisos contra BD antes de persistir.
  - `updateRoleById` y `patchRoleById` ahora aceptan `permissions`:
    - validan existencia de códigos,
    - convierten códigos a IDs,
    - actualizan rol y relaciones en una operación transaccional.
  - Se agregó `getRolePermissionsById` para retornar permisos de un rol por ID.
  - Se mantuvo validación robusta de `id` y control de duplicados por nombre.

### Fixed
- Error de validación por formato de permisos no alineado con los datos reales (`recurso:accion` vs `recurso.accion`).
- Error al actualizar roles cuando no se enviaba `name` en `PUT`.
- Restricción funcional que impedía actualizar permisos mediante `PUT/PATCH`.
- Omisión de endpoint dedicado para consultar permisos por rol.

### Notes
- El módulo de roles queda alineado con la arquitectura existente (routes → controllers → models + schemas + middlewares).

-----------------------------------------------------------------------------------------------------------------------------

## [v1.5.8] - 2026-05-16

### Added
- Nuevo archivo `DOCUMENTATION.md` con documentación funcional de toda la aplicación backend.
- Cobertura documental por módulos:
  - `app`, `config`, `routes`, `controllers`, `models`, `middlewares`, `schemas` y `utils`.
- Secciones específicas para cada endpoint y cada función principal, describiendo objetivo, flujo y responsabilidad.

### Changed
- Se incorporó una estructura de documentación técnica centralizada y atómica para facilitar:
  - onboarding de nuevos desarrolladores,
  - trazabilidad funcional por archivo,
  - lectura rápida del flujo request → middleware → controller → model.
- Se dejó explícita la relación entre contratos de validación (`schemas`) y su aplicación en rutas/middlewares.

### Notes
- Esta versión no modifica lógica de negocio ni comportamiento de endpoints; corresponde a mejora documental.
- El archivo está diseñado para consulta directa del código, con foco en claridad funcional y responsabilidad por componente.

-----------------------------------------------------------------------------------------------------------------------------

## [v1.6.1] - 2026-05-16

### Changed
- **src/models/users.model.js**
  - `getAll()` ahora retorna también el rol actual del usuario mediante `LEFT JOIN` entre:
    - `users`
    - `user_roles`
    - `roles`
  - `findById(id)` ahora incluye el campo `role` para mantener consistencia de lectura en endpoints de detalle.
  - `update(id, data)` fue reforzado con transacción para:
    - actualizar campos base del usuario en `users`,
    - aplicar cambio de rol en `user_roles` cuando se envía `role`,
    - validar existencia de rol por nombre antes de persistir relación,
    - mantener `commit/rollback` para consistencia.
- **src/controllers/users.controller.js**
  - `updateUserById` y `patchUserById` ahora transforman `password` a `password_hash` con `bcryptjs` antes de delegar al modelo.
  - Se unificaron mensajes de error para contemplar:
    - usuario inexistente,
    - rol inválido enviado en update.

### Fixed
- Corrección de persistencia en edición de usuarios cuando se modificaba rol desde frontend.
- Corrección de respuesta de lectura de usuarios para mostrar rol real asignado y evitar desalineación visual en frontend.
- Corrección de actualización de contraseña en PUT/PATCH (ahora siempre se persiste como hash).

### Notes
- Estos ajustes se realizaron para alinear completamente el contrato frontend/backend en gestión de usuarios con RBAC.
- No se introdujeron cambios de rutas; el impacto es interno en capa de modelo/controlador y en consistencia de datos devueltos.

-----------------------------------------------------------------------------------------------------------------------------

## [v1.6.2] - 2026-05-16

### Added
- Se amplió `docs/DOCUMENTATION.md` con una sección nueva de referencia rápida:
  - **“Mapa rápido de archivos y parámetros (guía práctica)”**.
- La nueva sección documenta, en lenguaje de onboarding:
  - propósito por archivo/capa,
  - entradas típicas (`req.params`, `req.body`, headers, variables de entorno),
  - relación funcional entre `routes`, `controllers`, `models`, `middlewares`, `schemas` y `utils`.

### Changed
- **README.md**
  - Se actualizó el bloque **Documentación adicional** con enlaces directos y consistentes a:
    - `docs/DOCUMENTATION.md`
    - `docs/RBAC.md`
    - `docs/CHANGELOG.md`
- Se mejoró la navegabilidad de la documentación para lectura rápida de estructura y responsabilidades del backend.

### Notes
- Esta versión corresponde únicamente a mejoras de documentación y trazabilidad técnica.
- No hubo cambios en lógica de negocio, contratos de endpoints ni esquema SQL.
