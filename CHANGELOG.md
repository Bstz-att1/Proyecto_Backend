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
