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
