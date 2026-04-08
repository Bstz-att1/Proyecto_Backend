-- =====================================================
-- CREACIÓN DE BASE DE DATOS Y PERMISO DE USUARIO PARA LA BASE DE DATOS
-- =====================================================
CREATE USER 'user_manager_3233198'@'localhost' IDENTIFIED BY '#ADSO_3233198';

CREATE DATABASE IF NOT EXISTS task_manager;
USE task_manager;

GRANT ALL PRIVILEGES ON task_manager.* TO 'user_manager_3233198'@'localhost';
FLUSH PRIVILEGES;

-- =====================================================
--  ACCESO USUARIO Y USO DE LA BASE DE DATOS
-- =====================================================

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