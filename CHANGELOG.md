# Changelog

## [v1.1.0] - 2026-04-06
### Added
- Separación de responsabilidades en el backend:
  - Creación de **controladores** para usuarios y tareas.
  - Refactorización de **rutas** para delegar la lógica a los controladores.
- Estructura modular del proyecto:
  - `src/routes/users.routes.js`
  - `src/routes/tasks.routes.js`
  - `src/controllers/users.controller.js`
  - `src/controllers/tasks.controller.js`
- Archivo principal `app.js` actualizado para usar las nuevas rutas.

### Changed
- Las rutas ya no contienen lógica directa, ahora solo direccionan hacia los controladores.

### Version
- `v1.0.0` → Inicio del backend con servidor básico y rutas directas.
- `v1.1.0` → Separación de rutas y creación de controladores.
