-- Creación de tablas para Turnero

-- 1. Tabla de Servicios
CREATE TABLE IF NOT EXISTS services (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    price VARCHAR(50) NOT NULL,
    color VARCHAR(100) NOT NULL
);

-- 2. Tabla de Turnos (Appointments)
CREATE TABLE IF NOT EXISTS appointments (
    id SERIAL PRIMARY KEY,
    service VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    time VARCHAR(50) NOT NULL,
    client_name VARCHAR(150) NOT NULL,
    color VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 3. Inserción de Servicios por defecto (Seed data)
INSERT INTO services (id, name, duration, price, color)
VALUES 
    ('srv-1', 'Asesoría de Negocios', '45 min', '$45', 'from-blue-500 to-indigo-600'),
    ('srv-2', 'Desarrollo Web & UX', '60 min', '$80', 'from-purple-500 to-pink-600'),
    ('srv-3', 'Mentoría 1-a-1 Tech', '30 min', '$30', 'from-emerald-400 to-teal-600')
ON CONFLICT (id) DO UPDATE 
SET name = EXCLUDED.name, 
    duration = EXCLUDED.duration, 
    price = EXCLUDED.price, 
    color = EXCLUDED.color;

-- 4. Inserción de Turnos iniciales de ejemplo (Opcional)
INSERT INTO appointments (service, date, time, client_name, color)
VALUES
    ('Desarrollo Web & UX', '2026-06-02', '10:30 AM', 'Sofia Rodríguez', 'from-purple-500 to-pink-600'),
    ('Asesoría de Negocios', '2026-06-03', '03:30 PM', 'Mateo Silva', 'from-blue-500 to-indigo-600');
