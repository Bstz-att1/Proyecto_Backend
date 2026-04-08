# 🎯 Gestor de Tareas - Backend API
[![Node.js](https://img.shields.io/badge/Node.js-v18-green?style=flat&logo=node.js)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5.x-blue?style=flat&logo=express)](https://expressjs.com)
[![MySQL](https://img.shields.io/badge/MySQL-3.x-lightblue?style=flat&logo=mysql)](https://www.mysql.com)
[![RESTful](https://img.shields.io/badge/RESTful-CRUD-orange?style=flat&logo=swagger)](https://swagger.io)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

## 📋 Tabla de contenido
- [📖 Propósito del Proyecto](#📖-propósito-del-proyecto)
- [🏗️ Arquitectura](#️-arquitectura)
- [📁 Estructura](#📁-estructura)
- [🛠️ Instalación](#️-instalación)
- [📖 API](#📖-api)
- [⚙️ Versionado](#️-versionado)

## 📖 Propósito del Proyecto
El Gestor de Tareas - Backend API es una aplicación diseñada para ofrecer un sistema robusto, escalable y mantenible de gestión de usuarios y tareas, con arquitectura modular y soporte completo para operaciones CRUD (Crear, Leer, Actualizar, Eliminar).

🎯 Objetivos principales
✅ Gestión integral de usuarios y tareas mediante endpoints RESTful claros y consistentes.

✅ Arquitectura por capas con separación de responsabilidades: rutas, controladores, modelos, base de datos y middleware.

✅ Persistencia real en MySQL, con modelos que reflejan fielmente el estado de la base de datos.

✅ Manejo global de errores con middleware centralizado (globalErrorHandler), garantizando respuestas uniformes y predecibles.

✅ Respuestas estandarizadas gracias a utilidades (successResponse, catchAsync, createError) que mejoran la experiencia de integración con frontend y pruebas en Postman.

✅ Escalabilidad y mantenibilidad: el diseño modular permite añadir nuevas entidades, funcionalidades y validaciones sin romper la estructura existente.

✅ Base sólida para futuras expansiones como autenticación, autorización, documentación con Swagger y despliegue en entornos productivos.

---

## 🏗️ Arquitectura por Capas
**Principio fundamental:** **Arquitectura por capas** con **responsabilidades únicas** y **Separación de Conceptos (SoC)**.

**Flujo unidireccional:**
```
Cliente → Routes → Controllers → Models → DB (MySQL) → Middleware (errores/respuestas)
```

## 🏗️ Arquitectura por Capas

| Capa           | Función                                      | Estado   |
|----------------|----------------------------------------------|----------|
| **Routes**     | Definen los endpoints HTTP (`/api/users`, `/api/tasks`) y delegan la lógica | 🟢 Activo |
| **Controllers**| Contienen la lógica de negocio, validaciones y manejo de respuestas | 🟢 Activo |
| **Models/DB**  | Acceso y persistencia de datos en MySQL, reflejando el estado real de la BD | 🟢 Activo |
| **Middleware** | Manejo global de errores (`globalErrorHandler`), respuestas estandarizadas y utilidades | 🟢 Activo |
| **Utils**      | Funciones auxiliares (`catchAsync`, `response.handler`, `createError`) para soporte de controladores y middleware | 🟢 Activo |

---

## ✨ Beneficios

- 🔧 **Bajo acoplamiento** → Cada capa tiene responsabilidades únicas, lo que facilita pruebas unitarias y mantenimiento.  
- ⚡ **Flujo uniforme de errores** → El middleware centraliza el manejo de fallos, garantizando respuestas predecibles y consistentes.  
- 🔄 **Modularidad** → La arquitectura permite añadir nuevas entidades o funcionalidades sin romper la estructura existente.  
- 📈 **Escalabilidad** → Preparado para crecer con autenticación, autorización, documentación y despliegue en producción.  
- 🛡️ **Robustez** → Validaciones claras y manejo de errores operacionales con detalles, mejorando la confiabilidad de la API.  
- 🤝 **Integración sencilla** → Respuestas estandarizadas (`successResponse`, `errorResponse`) que facilitan la conexión con frontend y pruebas en Postman.  


## 📁 Estructura del Proyecto
```
BACKEND/
├── node_modules/              # 📦 Dependencias instaladas
├── sql/                       # 🗄️ Scripts SQL para base de datos
│   ├── data.sql
│   ├── database.sql
│   └── task_manager.sql
├── src/                       # 💻 Código fuente principal
│   ├── app.js                 # 🚀 Servidor Express (entrypoint)
│   ├── config/                # ⚙️ Configuración
│   │   └── db.js              # Conexión a MySQL
│   ├── controllers/           # 👨‍💻 Lógica de negocio
│   │   ├── tasks.controller.js
│   │   └── users.controller.js
│   ├── middlewares/           # 🛡️ Middleware global
│   │   └── error.middleware.js
│   ├── models/                # 🗄️ Acceso a datos
│   │   ├── tasks.model.js
│   │   └── users.model.js
│   ├── routes/                # 📍 Rutas API
│   │   ├── tasks.routes.js
│   │   └── users.routes.js
│   └── utils/                 # 🛠️ Utilidades
│       ├── catchAsync.js
│       └── response.handler.js
├── .env                       # 🔑 Variables de entorno
├── .env.example               # 📑 Ejemplo de configuración
├── .gitignore                 # 🚫 Archivos ignorados por Git
├── CHANGELOG.md               # 📝 Historial de versiones
├── package.json               # 📦 Configuración del proyecto
├── package-lock.json
└── README.md                  # 📚 Documentación del proyecto

```

## 🛠️ Instalación & Ejecución
```bash
# 📂 Navegar
cd Backend

# 🛠️ Instalar dependencias
npm install

# ▶️ Desarrollo
npm run dev

# 🚀 Producción
npm start

**URL:** `http://localhost:3000`  ,

**Scripts package.json:** `{ "start": "node src/app.js" }`,

**Scripts package.json:** `{ "dev": "nodemon src/app.js" }`,

## 📖 API REST Endpoints

### 👥 Usuarios
| Method   | Endpoint         | Descripción                          |
|----------|------------------|--------------------------------------|
| **GET**  | `/api/users`     | Listar todos los usuarios            |
| **POST** | `/api/users`     | Crear nuevo usuario                  |
| **GET**  | `/api/users/:id` | Consultar usuario por ID             |
| **PUT**  | `/api/users/:id` | Actualizar usuario completo          |
| **PATCH**| `/api/users/:id` | Actualización parcial de usuario     |
| **DELETE**| `/api/users/:id`| Eliminar usuario                     |

### 📋 Tareas
| Method   | Endpoint         | Descripción                          |
|----------|------------------|--------------------------------------|
| **GET**  | `/api/tasks`     | Listar todas las tareas              |
| **POST** | `/api/tasks`     | Crear nueva tarea                    |
| **GET**  | `/api/tasks/:id` | Consultar tarea por ID               |
| **PUT**  | `/api/tasks/:id` | Actualizar tarea completa            |
| **PATCH**| `/api/tasks/:id` | Actualización parcial de tarea       |
| **DELETE**| `/api/tasks/:id`| Eliminar tarea                       |

---

### 📌 Notas
- Todas las respuestas están **estandarizadas** mediante `successResponse` y `errorResponse`.  
- Los errores son manejados de forma **global** por `globalErrorHandler`.  
- Los modelos devuelven objetos consistentes con flags (`created`, `updated`, `deleted`) o `null` si el recurso no existe.  
