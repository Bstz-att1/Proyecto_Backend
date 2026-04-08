-- Insert de usuarios: 
INSERT INTO users (name, email, document, role) VALUES
('Juan Pérez', 'juan.perez@mail.com', '1001', 'admin'),
('María García', 'maria.garcia@mail.com', '1002', 'user'),
('Carlos Rodríguez', 'carlos.rodriguez@mail.com', '1003', 'user'),
('Ana Martínez', 'ana.martinez@mail.com', '1004', 'user'),
('Luis Hernández', 'luis.hernandez@mail.com', '1005', 'user'),
('Sofía Ramírez', 'sofia.ramirez@mail.com', '1006', 'user'),
('David Torres', 'david.torres@mail.com', '1007', 'user'),
('Laura Gómez', 'laura.gomez@mail.com', '1008', 'user'),
('Andrés Vargas', 'andres.vargas@mail.com', '1009', 'user'),
('Valentina Castro', 'valentina.castro@mail.com', '1010', 'user');

-- insert de tareas: 
INSERT INTO tasks (user_id, title, description, status, created_by) VALUES
(1, 'Revisar autenticación', 'Validar login, JWT y seguridad de contraseñas', 'completada', 'admin'),

(2, 'Diseñar dashboard', 'Crear mockups y prototipos del panel principal', 'en progreso', 'admin'),

(3, 'Informe del sprint', 'Documentar avances y pendientes del sprint actual', 'pendiente', 'user'),

(4, 'Optimizar base de datos', 'Mejorar rendimiento de consultas lentas', 'en progreso', 'admin'),

(5, 'Corregir formulario', 'Arreglar validación de email en móviles', 'completada', 'user');