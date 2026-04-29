-- Insert de usuarios (4 usuarios con hash distinto)
-- Contraseñas para test:
-- 1) dario.herrera@gmail.com  -> Password123!
-- 2) jhon.bueno@gmail.com     -> Admin456!
-- 3) maria.garcia@mail.com    -> User789!
-- 4) carlos.rodriguez@mail.com-> Test321!

INSERT INTO users (name, email, document, role, password_hash) VALUES
('Dario Herrera', 'dario.herrera@gmail.com', '1001', 'admin', '$2b$10$W6GB.yYfYo6ExqicEQYR1.QUIMOhT2DoM7uB/Zvz2jLmOrBO58r2i'),
('Jhon Bueno', 'jhon.bueno@gmail.com', '2222', 'admin', '$2b$10$eEPsK8bfAAxaQ4dhua5G2eaZ4UKTlnp5xX3rJxQBOdRnsU/ByuT06'),
('María García', 'maria.garcia@mail.com', '1002', 'user', '$2b$10$QZBOcNGS26P7o1NazZIzLeswtVZE0ykA1gac4B39E6aUs4JcLBbIa'),
('Carlos Rodríguez', 'carlos.rodriguez@mail.com', '1003', 'user', '$2b$10$dtIj1kv9m2Wf3u8pW0C5A.k85jUohAhoWIr7ZZhJsPTbwjC/cvlja');

-- Insert de tareas (4 tareas por usuario = 16 tareas)
INSERT INTO tasks (user_id, title, description, status, created_by) VALUES
-- Usuario 1 (Dario Herrera)
(1, 'Revisar autenticación', 'Validar login, JWT y seguridad de contraseñas', 'completada', 'admin'),
(1, 'Auditar permisos', 'Verificar roles y accesos en endpoints críticos', 'en progreso', 'admin'),
(1, 'Configurar logs', 'Centralizar logs de autenticación y errores', 'pendiente', 'admin'),
(1, 'Actualizar dependencias', 'Actualizar librerías de seguridad a últimas versiones', 'pendiente', 'admin'),

-- Usuario 2 (Jhon Bueno)
(2, 'Diseñar dashboard', 'Crear mockups y prototipos del panel principal', 'en progreso', 'admin'),
(2, 'Definir métricas KPI', 'Establecer métricas clave para seguimiento semanal', 'pendiente', 'admin'),
(2, 'Optimizar consultas SQL', 'Reducir tiempos de respuesta en listados principales', 'completada', 'admin'),
(2, 'Documentar arquitectura', 'Describir módulos y flujo general del backend', 'pendiente', 'admin'),

-- Usuario 3 (María García)
(3, 'Informe del sprint', 'Documentar avances y pendientes del sprint actual', 'pendiente', 'user'),
(3, 'Probar endpoints', 'Ejecutar pruebas funcionales de usuarios y tareas', 'en progreso', 'user'),
(3, 'Corregir validaciones', 'Ajustar mensajes de error en formularios', 'completada', 'user'),
(3, 'Preparar casos QA', 'Crear casos de prueba para regresión', 'pendiente', 'user'),

-- Usuario 4 (Carlos Rodríguez)
(4, 'Optimizar base de datos', 'Mejorar rendimiento de consultas lentas', 'en progreso', 'admin'),
(4, 'Implementar paginación', 'Agregar paginación al listado de tareas y usuarios', 'pendiente', 'user'),
(4, 'Pruebas de integración', 'Validar conexión entre frontend, API y base de datos', 'pendiente', 'admin'),
(4, 'Refactorizar servicios', 'Separar lógica de negocio en módulos reutilizables', 'completada', 'user');
