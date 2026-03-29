# 🎯 Gestor de Tareas - Backend API
[![Node.js](https://img.shields.io/badge/Node.js-v18-green?style=flat&logo=node.js)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5.x-blue?style=flat&logo=express)](https://expressjs.com)
[![RESTful](https://img.shields.io/badge/RESTful-CRUD-orange?style=flat&logo=swagger)](https://swagger.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📋 Tabla de contenido
- [📖 Propósito del Proyecto](#📖-propósito-del-proyecto)
- [🏗️ Arquitectura](#️-arquitectura)
- [📁 Estructura](#📁-estructura)
- [🛠️ Instalación](#️-instalación)
- [📖 API](#📖-api)

## 📖 Propósito del Proyecto
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2em; border-radius: 15px; color: white; text-align: center;">

**Gestor de Tareas** es una aplicación **CRUD completa (Crear, Leer, Actualizar, Eliminar)** para gestión de tareas académicas/profesionales.

**Objetivos principales:**
- ✅ **Gestión eficiente** de tareas vía API RESTful
- ✅ **Escalabilidad** mediante diseño modular
- ✅ **Mantenibilidad** con separación clara de responsabilidades
- ✅ **Base sólida** para frontend y expansiones (DB, auth)

</div>

Este documento describe la **arquitectura y funcionamiento interno** del backend. La app se comunica con **API REST** siguiendo **enfoque modular** para máxima **claridad, escalabilidad y mantenibilidad**.

<details>
<summary>🎯 Casos de uso</summary>

- Estudiantes: Organizar tareas académicas
- Profesionales: Gestión diaria de pendientes
- Equipos: Colaboración en proyectos
</details>

## 🏗️ Arquitectura por Capas
**Principio fundamental:** **Arquitectura por capas** con **responsabilidades únicas** y **Separación de Conceptos (SoC)**.

**Flujo unidireccional:**
```
Cliente → Routes Layer → App/Server → (Future: Controllers → Models → DB)
```

| Capa          | Función                          | Estado     |
|---------------|----------------------------------|------------|
| **Routes**    | Endpoints HTTP (GET/POST users/tasks) | 🟢 Live |
| **App**       | Config Express/Middleware        | 🟢 Live |
| **Controllers**| Lógica negocio                   | ⏳ Pending |
| **Models/DB** | Persistencia datos               | ⏳ Pending |

**Beneficios:**
- 🔧 **Bajo acoplamiento** → Fácil testing
- ⚡ **Unidireccional** → Predictible/debuggable
- 🔄 **Modular** → Reutilizable/escalable

## 📁 Estructura del Proyecto
```
d:/adso/3233198v2/John/Proyecto/Backend/
├── src/                    # 💻 Código fuente
│   ├── app.js             # 🚀 Servidor Express (main)
│   └── routes/            # 📍 Rutas API
│       ├── users.routes.js # 👥 Users CRUD base
│       └── tasks.routes.js # 📋 Tasks CRUD base
├── package.json           # 📦 express@5, scripts
├── package-lock.json
└── README.md              # 📚 Esta docs
```

## 🛠️ Instalación & Ejecución
```bash
# 📂 Navegar
cd "d:/adso/3233198v2/John/Proyecto/Backend"

# 🛠️ Deps
npm install

# ▶️ Start
npm start
```
**URL:** `http://localhost:3000`  
**Scripts package.json:** `{ "start": "node src/app.js" }`

## 📖 API REST Preview
| Method | Endpoint       | Descripción              | Ejemplo cURL                  |
|--------|----------------|--------------------------|-------------------------------|
| **GET** | `/api/users`   | Listar todos usuarios    | `curl http://localhost:3000/api/users` |
| **POST**| `/api/users`   | Crear nuevo usuario      | `curl -X POST -H "Content-Type: application/json" -d '{"name":"Ana"}' http://localhost:3000/api/users` |
| **GET** | `/api/tasks`   | Listar tareas            | `curl http://localhost:3000/api/tasks` |
| **POST**| `/api/tasks`   | Crear tarea              | `curl -X POST -d '{"title":"Estudiar"}' http://localhost:3000/api/tasks` |
