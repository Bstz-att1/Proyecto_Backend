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
