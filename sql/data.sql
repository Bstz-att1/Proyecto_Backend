-- Insert de usuarios: 
INSERT INTO users (name, email, document, role) VALUES
('Dario Herrera', 'dario.herrera@gmail.com', '1001', 'admin'),
('Jhon Bueno', 'jhon.bueno@gmail.com', '2222', 'admin'),
('María García', 'maria.garcia@mail.com', '1002', 'user'),
('Carlos Rodríguez', 'carlos.rodriguez@mail.com', '1003', 'user'),
('Ana Martínez', 'ana.martinez@mail.com', '1004', 'user'),
('Luis Hernández', 'luis.hernandez@mail.com', '1005', 'user'),
('Sofía Ramírez', 'sofia.ramirez@mail.com', '1006', 'user'),
('David Torres', 'david.torres@mail.com', '1007', 'user'),
('Laura Gómez', 'laura.gomez@mail.com', '1008', 'user'),
('Andrés Vargas', 'andres.vargas@mail.com', '1009', 'user'),
('Valentina Castro', 'valentina.castro@mail.com', '1010', 'user'),
('Camilo Méndez', 'camilo.mendez@mail.com', '1011', 'user'),
('Paula Rojas', 'paula.rojas@mail.com', '1012', 'user'),
('Julián Pineda', 'julian.pineda@mail.com', '1013', 'user'),
('Natalia Cifuentes', 'natalia.cifuentes@mail.com', '1014', 'user'),
('Felipe Moreno', 'felipe.moreno@mail.com', '1015', 'user'),
('Daniela Suárez', 'daniela.suarez@mail.com', '1016', 'user'),
('Sebastián León', 'sebastian.leon@mail.com', '1017', 'user'),
('Carolina Nieto', 'carolina.nieto@mail.com', '1018', 'user'),
('Miguel Ángel Peña', 'miguel.pena@mail.com', '1019', 'user'),
('Gabriela Lozano', 'gabriela.lozano@mail.com', '1020', 'user');

-- insert de tareas: 
INSERT INTO tasks (user_id, title, description, status, created_by) VALUES
(1, 'Revisar autenticación', 'Validar login, JWT y seguridad de contraseñas', 'completada', 'admin'),
(2, 'Diseñar dashboard', 'Crear mockups y prototipos del panel principal', 'en progreso', 'admin'),
(3, 'Informe del sprint', 'Documentar avances y pendientes del sprint actual', 'pendiente', 'user'),
(4, 'Optimizar base de datos', 'Mejorar rendimiento de consultas lentas', 'en progreso', 'admin'),
(5, 'Corregir formulario', 'Arreglar validación de email en móviles', 'completada', 'user'),
(6, 'Configurar variables de entorno', 'Definir archivo .env para desarrollo y producción', 'pendiente', 'admin'),
(7, 'Implementar paginación', 'Agregar paginación al listado de tareas y usuarios', 'en progreso', 'user'),
(8, 'Pruebas de integración', 'Validar conexión entre frontend, API y base de datos', 'pendiente', 'admin'),
(9, 'Refactorizar servicios', 'Separar lógica de negocio en módulos reutilizables', 'completada', 'user'),
(10, 'Revisión de accesibilidad', 'Verificar contraste, labels y navegación por teclado', 'pendiente', 'user'),
(11, 'Crear endpoint de reportes', 'Construir endpoint para resumen de tareas por estado', 'en progreso', 'admin'),
(12, 'Documentar API', 'Actualizar colección y ejemplos de uso de endpoints', 'completada', 'admin'),
(13, 'Validar campos obligatorios', 'Aplicar validaciones de esquema en create y update', 'pendiente', 'user'),
(14, 'Optimizar consultas JOIN', 'Reducir tiempos de respuesta en consultas complejas', 'en progreso', 'admin'),
(15, 'Agregar logs de auditoría', 'Registrar acciones críticas de usuarios administradores', 'pendiente', 'admin'),
(16, 'Corregir bug de edición', 'Solucionar fallo al editar tareas con caracteres especiales', 'completada', 'user'),
(17, 'Sincronizar estados UI', 'Alinear estados visuales con estados persistidos en BD', 'en progreso', 'user'),
(18, 'Implementar búsqueda avanzada', 'Permitir búsqueda por título, estado y responsable', 'pendiente', 'admin'),
(19, 'Actualizar dependencias', 'Migrar librerías a versiones estables recientes', 'completada', 'admin'),
(20, 'Definir backups', 'Crear estrategia de copias de seguridad automáticas', 'pendiente', 'admin'),
(1, 'Capacitación de usuarios', 'Preparar guía práctica para uso del gestor de tareas', 'en progreso', 'user'),
(2, 'Prueba de carga inicial', 'Simular múltiples solicitudes concurrentes al API', 'pendiente', 'admin'),
(3, 'Ajustar mensajes de error', 'Estandarizar formato de errores para frontend', 'completada', 'user'),
(4, 'Control de sesiones', 'Revisar expiración de tokens y renovación segura', 'en progreso', 'admin'),
(5, 'Monitoreo de rendimiento', 'Configurar métricas básicas de latencia y errores', 'pendiente', 'admin'),
(1, 'Actualizar backlog', 'Priorizar historias y ajustar estimaciones del sprint', 'pendiente', 'admin'),
(1, 'Validar flujo de registro', 'Revisar reglas de validación en formulario de alta', 'en progreso', 'user'),
(1, 'Cierre de incidencias', 'Consolidar tickets resueltos y dejar trazabilidad', 'completada', 'admin'),

(2, 'Preparar demo interna', 'Organizar demo funcional del avance de la iteración', 'pendiente', 'admin'),
(2, 'Revisar permisos de acceso', 'Comprobar roles y alcance de funcionalidades críticas', 'en progreso', 'user'),
(2, 'Documentar cambios de versión', 'Registrar mejoras y correcciones en changelog técnico', 'completada', 'admin'),

(3, 'Refinar historias técnicas', 'Ajustar criterios de aceptación de módulos pendientes', 'pendiente', 'admin'),
(3, 'Validar integraciones externas', 'Probar consumo de servicios de terceros en staging', 'en progreso', 'user'),
(3, 'Cerrar pendientes funcionales', 'Confirmar resolución de observaciones de QA', 'completada', 'admin'),

(4, 'Optimizar consultas críticas', 'Reducir tiempos en endpoints con mayor tráfico', 'pendiente', 'admin'),
(4, 'Revisión de componentes UI', 'Corregir inconsistencias visuales en formularios', 'en progreso', 'user'),
(4, 'Actualizar guía técnica', 'Agregar decisiones de arquitectura recientes', 'completada', 'admin'),

(5, 'Planificar pruebas regresivas', 'Definir matriz de validación para release', 'pendiente', 'admin'),
(5, 'Ajustar validaciones de entrada', 'Corregir mensajes y reglas de campos obligatorios', 'en progreso', 'user'),
(5, 'Entregar reporte de avance', 'Consolidar estado de tareas de la semana', 'completada', 'admin'),

(6, 'Configurar entorno QA', 'Preparar variables y conexiones para pruebas integradas', 'pendiente', 'admin'),
(6, 'Implementar mejoras de rendimiento', 'Aplicar ajustes en procesos con alta latencia', 'en progreso', 'user'),
(6, 'Documentar lecciones del sprint', 'Registrar hallazgos técnicos y acciones correctivas', 'completada', 'user'),

(7, 'Refactor de módulo de tareas', 'Simplificar lógica de servicios y adaptadores', 'pendiente', 'admin'),
(7, 'Ajustar filtros por usuario', 'Verificar comparación de IDs en diferentes formatos', 'en progreso', 'user'),
(7, 'Cierre técnico de iteración', 'Dejar checklist final de despliegue validado', 'completada', 'user'),

(8, 'Preparar ambiente de pruebas', 'Sincronizar datos semilla para QA funcional', 'pendiente', 'admin'),
(8, 'Revisar respuestas de API', 'Confirmar estructura estándar success/data/errors', 'en progreso', 'user'),
(8, 'Depurar incidencias reportadas', 'Corregir comportamientos inconsistentes de backend', 'completada', 'user'),

(9, 'Definir estrategia de logs', 'Establecer eventos clave para monitoreo operativo', 'pendiente', 'admin'),
(9, 'Ajustar mensajes de error', 'Unificar redacción y códigos de respuesta', 'en progreso', 'user'),
(9, 'Actualizar evidencias de pruebas', 'Guardar capturas y resultados de validación', 'completada', 'user'),

(10, 'Revisión de accesibilidad avanzada', 'Validar navegación con teclado y contraste', 'pendiente', 'admin'),
(10, 'Ajustar etiquetas de formularios', 'Corregir labels y ayudas contextuales', 'en progreso', 'user'),
(10, 'Consolidar feedback UX', 'Documentar mejoras priorizadas para interfaz', 'completada', 'user'),

(11, 'Diseñar reporte por estado', 'Definir métricas y formato de salida para dashboard', 'pendiente', 'admin'),
(11, 'Optimizar endpoint de reportes', 'Mejorar tiempos y paginación en resultados', 'en progreso', 'user'),
(11, 'Publicar documentación de consumo', 'Actualizar ejemplos de uso para frontend', 'completada', 'user'),

(12, 'Plan de documentación API', 'Organizar secciones y endpoints críticos', 'pendiente', 'admin'),
(12, 'Validar ejemplos de request', 'Corregir payloads y respuestas de referencia', 'en progreso', 'user'),
(12, 'Cerrar revisión documental', 'Aprobar versión final para publicación interna', 'completada', 'user'),

(13, 'Fortalecer validaciones de esquema', 'Incluir reglas para campos opcionales y obligatorios', 'pendiente', 'admin'),
(13, 'Revisar mensajes de Zod', 'Alinear errores de validación con UI', 'en progreso', 'user'),
(13, 'Completar pruebas de validación', 'Registrar casos exitosos y fallidos de entrada', 'completada', 'user'),

(14, 'Mejorar rendimiento SQL', 'Analizar índices y planes de ejecución críticos', 'pendiente', 'admin'),
(14, 'Refinar consultas complejas', 'Reducir joins innecesarios en listados', 'en progreso', 'user'),
(14, 'Verificar impacto en endpoints', 'Confirmar estabilidad tras optimizaciones', 'completada', 'user'),

(15, 'Diseñar auditoría de acciones', 'Definir eventos y campos para trazabilidad', 'pendiente', 'admin'),
(15, 'Implementar registro de cambios', 'Guardar operación, actor y timestamp', 'en progreso', 'user'),
(15, 'Validar logs de auditoría', 'Comprobar consistencia de eventos registrados', 'completada', 'user'),

(16, 'Reproducir bug de edición', 'Identificar pasos exactos para fallo reportado', 'pendiente', 'admin'),
(16, 'Aplicar corrección al editor', 'Ajustar manejo de caracteres especiales', 'en progreso', 'user'),
(16, 'Confirmar solución en QA', 'Verificar que el error no reaparezca', 'completada', 'user'),

(17, 'Sincronizar estados de negocio', 'Alinear reglas de estado entre UI y API', 'pendiente', 'admin'),
(17, 'Validar transiciones permitidas', 'Comprobar cambios válidos de estado', 'en progreso', 'user'),
(17, 'Documentar flujo de estados', 'Registrar comportamiento esperado por caso', 'completada', 'user'),

(18, 'Diseñar búsqueda avanzada', 'Definir filtros por título, estado y responsable', 'pendiente', 'admin'),
(18, 'Implementar criterios combinados', 'Aplicar lógica de búsqueda en backend', 'en progreso', 'user'),
(18, 'Probar resultados de búsqueda', 'Validar precisión con diferentes combinaciones', 'completada', 'user'),

(19, 'Planificar actualización de dependencias', 'Revisar changelogs y riesgos de migración', 'pendiente', 'admin'),
(19, 'Actualizar paquetes críticos', 'Migrar librerías de seguridad y utilidades', 'en progreso', 'user'),
(19, 'Validar compatibilidad general', 'Ejecutar pruebas tras actualización', 'completada', 'user'),

(20, 'Definir política de backups', 'Establecer frecuencia y retención de copias', 'pendiente', 'admin'),
(20, 'Configurar respaldo automático', 'Programar ejecución periódica de backups', 'en progreso', 'user'),
(20, 'Verificar restauración', 'Probar recuperación de datos en entorno controlado', 'completada', 'user');
