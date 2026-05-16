# 🔐 RBAC en el Proyecto (Role-Based Access Control)

Este documento resume cómo funciona la autorización por roles y permisos en el backend, con enfoque técnico para **exposición** y para preparación de una **versión estable**.

---

## 1) ¿Qué es RBAC en este proyecto?

RBAC (Role-Based Access Control) es el mecanismo que controla **qué acciones puede ejecutar un usuario** según los permisos asociados a sus roles.

En esta API:

- Un usuario se autentica con JWT.
- El middleware valida identidad.
- Luego se valida si el usuario tiene el permiso requerido para la ruta.
- Si no tiene permiso, responde **403 Forbidden**.

---

## 2) Flujo técnico de autorización

Flujo simplificado por request protegida:

```text
Cliente
  → Envia Access Token
  → validateToken (auth.middleware)
      - Verifica JWT
      - Verifica sesión activa (token_version)
      - Adjunta req.user
  → checkPermission('modulo.accion') (rbac.middleware)
      - Obtiene permisos del usuario desde BD
      - Normaliza permisos por código
      - Evalúa si incluye el permiso requerido
  → Controller
```

### Resultado esperado

- ✅ Permiso válido: continúa al controlador.
- ❌ Sin token o token inválido: **401 Unauthorized**.
- ❌ Sin permiso: **403 Forbidden**.

---

## 3) Implementación actual (código)

## Middleware RBAC (`src/middlewares/rbac.middleware.js`)

- Función principal: `checkPermission(requiredPermission)`.
- Lee identidad desde `req.user?.userId`.
- Consulta permisos efectivos del usuario en BD:
  - `RoleModel.getPermissionsByUserId(userId)`.
- Guarda permisos completos en:
  - `req.user.permissions`.
- Evalúa acceso por códigos:
  - `permissions.map(permission => permission.code)`.

Si falta permiso:
- Retorna error `Forbidden (403)` con detalle de la acción requerida.

## Modelo de roles (`src/models/roles.model.js`)

Método clave:

- `getPermissionsByUserId(userId)`

Consulta SQL (resumen):

- `users`
- `user_roles`
- `roles`
- `role_permissions`
- `permissions`

Retorna lista única de permisos en formato:

```json
[
  { "code": "users.get", "description": "..." },
  { "code": "tasks.update", "description": "..." }
]
```

---

## 4) Modelo de datos RBAC en base de datos

Tablas principales relacionadas:

- `users` → usuarios del sistema
- `roles` → catálogo de roles (ADMIN, SUPERVISOR, USER, etc.)
- `permissions` → catálogo de permisos por código (`users.get`, `roles.manage`, etc.)
- `user_roles` → relación N:M entre usuarios y roles
- `role_permissions` → relación N:M entre roles y permisos

Relación lógica:

```text
users --< user_roles >-- roles --< role_permissions >-- permissions
```

---

## 5) Matriz de permisos usada por rutas actuales

> Basado en `src/routes/*.routes.js`

## Auth (`/auth`)

- `POST /auth/login` → público
- `POST /auth/refresh` → público
- `POST /auth/logout` → requiere `validateToken`

## Users (`/users`)

- `GET /users` → `users.get`
- `GET /users/:id` → `users.get`
- `POST /users` → `users.create`
- `PUT /users/:id` → `users.update`
- `PATCH /users/:id` → `users.update`
- `DELETE /users/:id` → `users.delete`

## Tasks (`/tasks`)

- `GET /tasks` → `tasks.get`
- `GET /tasks/:id` → `tasks.get`
- `POST /tasks` → `tasks.create`
- `PUT /tasks/:id` → `tasks.update`
- `PATCH /tasks/:id` → `tasks.update`
- `DELETE /tasks/:id` → `tasks.delete`

## Roles (`/roles`)

- `GET /roles` → `roles.get`
- `GET /roles/:id` → `roles.get`
- `GET /roles/:id/permissions` → `roles.get`
- `POST /roles` → `roles.manage`
- `PUT /roles/:id` → `roles.manage`
- `PATCH /roles/:id` → `roles.manage`
- `DELETE /roles/:id` → `roles.manage`
- `POST /roles/manage` → `roles.manage`

---

## 6) Casos prácticos para exposición

## Caso A: acceso permitido

1. Usuario con rol que incluye `tasks.update`.
2. Ejecuta `PATCH /tasks/10`.
3. `checkPermission('tasks.update')` devuelve true.
4. Respuesta exitosa (200).

## Caso B: acceso denegado

1. Usuario autenticado sin `roles.manage`.
2. Ejecuta `POST /roles`.
3. `checkPermission('roles.manage')` devuelve false.
4. API responde 403 con mensaje de permiso faltante.

## Caso C: token inválido o ausente

1. Cliente llama `GET /users` sin token válido.
2. Falla `validateToken`.
3. API responde 401 Unauthorized.

---

## 7) Ventajas del enfoque actual

- Seguridad por capas: autenticación + autorización.
- Permisos centralizados y reutilizables por ruta.
- Escalable para nuevos módulos (`projects.*`, `reports.*`, etc.).
- Trazabilidad: permisos completos quedan en `req.user.permissions`.
- Buen alineamiento con arquitectura modular del proyecto.

---

## 8) Recomendaciones para versión estable

1. Mantener catálogo de permisos documentado y versionado.
2. Evitar hardcode de roles en controladores; usar permisos por acción.
3. Añadir pruebas automatizadas de autorización (401/403/200).
4. Auditar rutas nuevas para que siempre incluyan:
   - `validateToken`
   - `checkPermission(...)` cuando corresponda.
5. Unificar convenciones de permisos:
   - Formato recomendado actual: `modulo.accion`.

---

## 9) Resumen para diapositiva final (exposición)

- El backend implementa RBAC real en tiempo de ejecución.
- Cada ruta protegida valida identidad y permiso específico.
- Los permisos se resuelven desde BD por relaciones usuario-rol-permiso.
- Resultado: control fino de acceso, seguridad consistente y escalabilidad para crecimiento del sistema.
