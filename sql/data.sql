-- ==========================================
-- 1. INSERTAR ROLES
-- ==========================================
INSERT INTO roles (id, name, description) VALUES
(1, 'ADMIN', 'Acceso total a la administración de usuarios y tareas'),
(2, 'SUPERVISOR', 'Gestión de todas las tareas y visualización de usuarios'),
(3, 'USER', 'Gestión exclusiva de sus propias tareas');

-- ==========================================
-- 2. INSERTAR PERMISOS (Nomenclatura granular)
-- ==========================================
INSERT INTO permissions (id, code, description) VALUES
-- Permisos de Usuarios
(1, 'users.get', 'Ver listado de usuarios'),
(2, 'users.create', 'Crear nuevos usuarios'),
(3, 'users.update', 'Editar información de usuarios'),
(4, 'users.delete', 'Eliminar usuarios del sistema'),
-- Permisos de Tareas
(5, 'tasks.get', 'Listar y consultar tareas'),
(6, 'tasks.create', 'Crear nuevas tareas'),
(7, 'tasks.update', 'Modificar estado o contenido de tareas'),
(8, 'tasks.delete', 'Eliminar tareas del sistema'),
-- Permisos de Roles
(9, 'roles.get', 'Ver listado y detalle de roles'),
(10, 'roles.manage', 'Gestionar asignación de permisos por rol'),
-- Permisos Especiales
(11, 'reports.export', 'Exportar reportes de productividad');

-- ==========================================
-- 3. VINCULAR ROLES CON PERMISOS
-- ==========================================

-- ADMIN: Tiene todos los permisos
INSERT INTO role_permissions (role_id, permission_id) 
SELECT 1, id FROM permissions;

-- SUPERVISOR: Gestiona tareas y puede ver usuarios (pero no editarlos/borrarlos)
INSERT INTO role_permissions (role_id, permission_id) VALUES 
(2, 1), -- users.get
(2, 5), (2, 6), (2, 7), (2, 8), -- Gestión de tareas
(2, 9), -- roles.get
(2, 11); -- reports.export

-- USER: Solo puede operar con tareas
INSERT INTO role_permissions (role_id, permission_id) VALUES 
(3, 5), (3, 6), (3, 7), (3, 8);

-- Insert de usuarios (4 usuarios con hash distinto)
-- Contraseñas para test:
-- 1) dario.herrera@gmail.com  -> Password123!
-- 2) jhon.bueno@gmail.com     -> Admin456!
-- 3) maria.garcia@mail.com    -> User789!
-- 4) carlos.rodriguez@mail.com-> Test321!

INSERT INTO users (name, email, document, password_hash) VALUES
('Dario Herrera', 'dario.herrera@gmail.com', '1001', '$2b$10$W6GB.yYfYo6ExqicEQYR1.QUIMOhT2DoM7uB/Zvz2jLmOrBO58r2i'),
('Jhon Bueno', 'jhon.bueno@gmail.com', '2222', '$2b$10$eEPsK8bfAAxaQ4dhua5G2eaZ4UKTlnp5xX3rJxQBOdRnsU/ByuT06'),
('María García', 'maria.garcia@mail.com', '1002', '$2b$10$QZBOcNGS26P7o1NazZIzLeswtVZE0ykA1gac4B39E6aUs4JcLBbIa'),
('Carlos Rodríguez', 'carlos.rodriguez@mail.com', '1003', '$2b$10$dtIj1kv9m2Wf3u8pW0C5A.k85jUohAhoWIr7ZZhJsPTbwjC/cvlja');

-- Insert de tareas (4 tareas por usuario = 16 tareas)
INSERT INTO tasks (user_id, title, description, status, created_by_role) VALUES
-- Usuario 1 (Dario Herrera)
(1, 'Revisar autenticación', 'Validar login, JWT y seguridad de contraseñas', 'completada', 'ADMIN'),
(1, 'Auditar permisos', 'Verificar roles y accesos en endpoints críticos', 'en progreso', 'ADMIN'),
(1, 'Configurar logs', 'Centralizar logs de autenticación y errores', 'pendiente', 'ADMIN'),
(1, 'Actualizar dependencias', 'Actualizar librerías de seguridad a últimas versiones', 'pendiente', 'ADMIN'),

-- Usuario 2 (Jhon Bueno)
(2, 'Diseñar dashboard', 'Crear mockups y prototipos del panel principal', 'en progreso', 'SUPERVISOR'),
(2, 'Definir métricas KPI', 'Establecer métricas clave para seguimiento semanal', 'pendiente', 'SUPERVISOR'),
(2, 'Optimizar consultas SQL', 'Reducir tiempos de respuesta en listados principales', 'completada', 'SUPERVISOR'),
(2, 'Documentar arquitectura', 'Describir módulos y flujo general del backend', 'pendiente', 'SUPERVISOR'),

-- Usuario 3 (María García)
(3, 'Informe del sprint', 'Documentar avances y pendientes del sprint actual', 'pendiente', 'USER'),
(3, 'Probar endpoints', 'Ejecutar pruebas funcionales de usuarios y tareas', 'en progreso', 'USER'),
(3, 'Corregir validaciones', 'Ajustar mensajes de error en formularios', 'completada', 'USER'),
(3, 'Preparar casos QA', 'Crear casos de prueba para regresión', 'pendiente', 'USER'),

-- Usuario 4 (Carlos Rodríguez)
(4, 'Optimizar base de datos', 'Mejorar rendimiento de consultas lentas', 'en progreso', 'USER'),
(4, 'Implementar paginación', 'Agregar paginación al listado de tareas y usuarios', 'pendiente', 'USER'),
(4, 'Pruebas de integración', 'Validar conexión entre frontend, API y base de datos', 'pendiente', 'USER'),
(4, 'Refactorizar servicios', 'Separar lógica de negocio en módulos reutilizables', 'completada', 'USER');

-- 1. Asignar ADMIN a Dario
INSERT INTO user_roles (user_id, role_id) 
VALUES (
    (SELECT id FROM users WHERE email = 'dario.herrera@gmail.com'),
    (SELECT id FROM roles WHERE name = 'ADMIN')
);

-- 2. Asignar SUPERVISOR a Jhon
INSERT INTO user_roles (user_id, role_id) 
VALUES (
    (SELECT id FROM users WHERE email = 'jhon.bueno@gmail.com'),
    (SELECT id FROM roles WHERE name = 'SUPERVISOR')
);

-- 3. Asignar USER a María y Carlos
INSERT INTO user_roles (user_id, role_id) 
VALUES 
(
    (SELECT id FROM users WHERE email = 'maria.garcia@mail.com'),
    (SELECT id FROM roles WHERE name = 'USER')
),
(
    (SELECT id FROM users WHERE email = 'carlos.rodriguez@mail.com'),
    (SELECT id FROM roles WHERE name = 'USER')
);
