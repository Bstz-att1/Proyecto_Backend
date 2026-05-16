# 🎯 Gestor de Tareas - Backend API

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green?style=flat&logo=node.js)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5.x-blue?style=flat&logo=express)](https://expressjs.com)
[![MySQL](https://img.shields.io/badge/MySQL-8.x-lightblue?style=flat&logo=mysql)](https://www.mysql.com)
[![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=flat&logo=jsonwebtokens)](https://jwt.io)
[![RBAC](https://img.shields.io/badge/Security-RBAC-purple?style=flat)](#)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

Backend RESTful para gestión de usuarios, tareas y roles, con autenticación JWT, control de permisos por RBAC y arquitectura modular por capas.

---

## 📋 Tabla de contenido

- [📖 Descripción general](#-descripción-general)
- [✅ Estado actual del proyecto](#-estado-actual-del-proyecto)
- [🏗️ Arquitectura](#️-arquitectura)
- [🧰 Stack tecnológico](#-stack-tecnológico)
- [📁 Estructura actual del proyecto](#-estructura-actual-del-proyecto)
- [🛠️ Instalación y ejecución](#️-instalación-y-ejecución)
- [🔐 Variables de entorno](#-variables-de-entorno)
- [📡 Endpoints principales](#-endpoints-principales)
- [🧪 Estado para nueva versión estable](#-estado-para-nueva-versión-estable)
- [📚 Documentación adicional](#-documentación-adicional)
- [⚙️ Versionado](#️-versionado)

---

## 📖 Descripción general

Este proyecto implementa una API backend robusta para la administración de:

- 👥 Usuarios
- 📋 Tareas
- 🛡️ Roles y permisos

Incluye:

- Autenticación con **JWT (access + refresh)**
- Autorización por permisos con **RBAC**
- Validación de datos con **Zod**
- Manejo global de errores
- Respuestas estandarizadas para integración frontend

---

## ✅ Estado actual del proyecto

**Versión funcional documentada:** `v1.5.8` (ver `CHANGELOG.md`)

### Módulos implementados y activos

- ✅ **Auth** (`/auth`)  
  Login, refresh y logout con invalidación de sesión.
- ✅ **Users** (`/users`)  
  CRUD completo protegido por token y permisos.
- ✅ **Tasks** (`/tasks`)  
  CRUD completo protegido por token y permisos.
- ✅ **Roles** (`/roles`)  
  CRUD de roles, consulta de permisos y gestión con validación.

### Capacidades de seguridad activas

- ✅ `validateToken` para rutas protegidas
- ✅ `checkPermission(...)` para autorización granular
- ✅ invalidación de sesión por `token_version`
- ✅ errores 401/403 estandarizados

---

## 🏗️ Arquitectura

### Principio base
Arquitectura por capas con separación de responsabilidades (SoC):

```text
Cliente
  ↓
Routes
  ↓
Middlewares (Auth, RBAC, Validación)
  ↓
Controllers
  ↓
Models
  ↓
DB (MySQL)
```

### Capas del sistema

| Capa | Responsabilidad | Estado |
|------|------------------|--------|
| **Routes** | Define endpoints y encadena middlewares | 🟢 Activo |
| **Middlewares** | Auth JWT, RBAC, validación schema, errores globales | 🟢 Activo |
| **Controllers** | Lógica de negocio y orquestación de respuesta | 🟢 Activo |
| **Models** | Acceso a datos y operaciones SQL | 🟢 Activo |
| **Utils** | Helpers de respuesta, JWT y manejo async | 🟢 Activo |
| **Schemas** | Contratos de validación (Zod) | 🟢 Activo |

---

## 🧰 Stack tecnológico

- **Node.js** + **Express 5**
- **MySQL 8** (`mysql2`)
- **JWT** (`jsonwebtoken`)
- **Hash de contraseñas** (`bcryptjs`)
- **Validación** (`zod`)
- **CORS** + parseo JSON/urlencoded
- **dotenv** para configuración
- **nodemon** en desarrollo

---

## 📁 Estructura actual del proyecto

```text
Backend/
├── .gitignore
├── CHANGELOG.md
├── DOCUMENTATION.md
├── package-lock.json
├── package.json
├── README.md
├── sql/
│   ├── data.sql
│   └── database.sql
└── src/
    ├── app.js
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── auth.controller.js
    │   ├── index.js
    │   ├── roles.controller.js
    │   ├── tasks.controller.js
    │   └── users.controller.js
    ├── middlewares/
    │   ├── auth.middleware.js
    │   ├── error.middleware.js
    │   ├── index.js
    │   ├── rbac.middleware.js
    │   └── validator.middleware.js
    ├── models/
    │   ├── index.js
    │   ├── roles.model.js
    │   ├── tasks.model.js
    │   └── users.model.js
    ├── routes/
    │   ├── auth.routes.js
    │   ├── roles.routes.js
    │   ├── tasks.routes.js
    │   └── users.routes.js
    ├── schemas/
    │   ├── index.js
    │   ├── roles.schema.js
    │   ├── tasks.schema.js
    │   └── users.schema.js
    └── utils/
        ├── catchAsync.js
        ├── index.js
        ├── jwt.handler.js
        └── response.handler.js
```

---

## 🛠️ Instalación y ejecución

```bash
# 1) Instalar dependencias
npm install

# 2) Ejecutar en desarrollo
npm run dev

# 3) Ejecutar en producción
npm start
```

Servidor por defecto:

- `http://localhost:3000`

Scripts actuales (`package.json`):

- `dev`: `nodemon src/app.js`
- `start`: `node src/app.js`

---

## 🔐 Variables de entorno

Crear archivo `.env` en la raíz del proyecto con valores equivalentes a:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=task_manager

JWT_SECRET=tu_jwt_secret
JWT_REFRESH_SECRET=tu_jwt_refresh_secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

> Ajusta nombres exactos según tu implementación en `src/config/db.js` y `src/utils/jwt.handler.js`.

---

## 📡 Endpoints principales

> Todas las rutas (excepto login/refresh) requieren autenticación y, según el caso, permisos RBAC.

### 🔑 Auth (`/auth`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/auth/login` | Iniciar sesión y obtener tokens |
| POST | `/auth/refresh` | Renovar access token |
| POST | `/auth/logout` | Cerrar sesión (protegido) |

### 👥 Users (`/users`)

| Método | Endpoint | Permiso sugerido |
|--------|----------|------------------|
| GET | `/users` | `users.get` |
| GET | `/users/:id` | `users.get` |
| POST | `/users` | `users.create` |
| PUT | `/users/:id` | `users.update` |
| PATCH | `/users/:id` | `users.update` |
| DELETE | `/users/:id` | `users.delete` |

### 📋 Tasks (`/tasks`)

| Método | Endpoint | Permiso sugerido |
|--------|----------|------------------|
| GET | `/tasks` | `tasks.get` |
| GET | `/tasks/:id` | `tasks.get` |
| POST | `/tasks` | `tasks.create` |
| PUT | `/tasks/:id` | `tasks.update` |
| PATCH | `/tasks/:id` | `tasks.update` |
| DELETE | `/tasks/:id` | `tasks.delete` |

### 🛡️ Roles (`/roles`)

| Método | Endpoint | Permiso sugerido |
|--------|----------|------------------|
| GET | `/roles` | `roles.get` |
| GET | `/roles/:id` | `roles.get` |
| GET | `/roles/:id/permissions` | `roles.get` |
| POST | `/roles` | `roles.manage` |
| PUT | `/roles/:id` | `roles.manage` |
| PATCH | `/roles/:id` | `roles.manage` |
| DELETE | `/roles/:id` | `roles.manage` |
| POST | `/roles/manage` | `roles.manage` |

---

## 🧪 Estado para nueva versión estable

### Checklist técnico recomendado

- ✅ Arquitectura modular consolidada
- ✅ CRUD completo en dominios principales
- ✅ Seguridad JWT + refresh + logout robusto
- ✅ RBAC funcional en rutas críticas
- ✅ Validación de payloads con Zod
- ✅ Manejo global de errores
- ✅ Documentación técnica adicional (`DOCUMENTATION.md`)
- ✅ Historial de cambios mantenido (`CHANGELOG.md`)


---

## 📚 Documentación adicional

- [`docs/DOCUMENTATION.md`](./docs/DOCUMENTATION.md) → Documentación funcional detallada por módulos y mapa rápido de archivos/parámetros.
- [`docs/RBAC.md`](./docs/RBAC.md) → Guía de permisos y reglas RBAC.
- [`docs/CHANGELOG.md`](./docs/CHANGELOG.md) → Historial completo de versiones y cambios.

---

## ⚙️ Versionado

Este repositorio sigue versionado incremental documentado en `CHANGELOG.md`.  
Estado actual reportado: **v1.5.8**.
