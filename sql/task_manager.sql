use task_manager;

-- =====================================================
-- CREAR TABLA DE USUARIOS
-- =====================================================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE, 
    document VARCHAR(25) NOT NULL UNIQUE,
    role ENUM('admin', 'user') DEFAULT 'user',
    
    -- Auditoría de registros
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- CREAR TABLA DE TAREAS
-- =====================================================
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    status ENUM('pendiente', 'en progreso', 'completada') DEFAULT 'pendiente',
    created_by ENUM('admin', 'user') NOT NULL,
    
    -- Tiempos de seguimiento
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Restricción de Integridad (No permite borrar usuario con tareas)
    CONSTRAINT fk_user_task
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

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