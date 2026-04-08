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



# Changelog

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
