create database todoapp;

create table users(
id serial primary key, 
username varchar(50) unique not null,
email varchar(255) unique not null,
bio varchar(255),
password_hash text not null,
refresh_token text unique
);

CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    priority VARCHAR(10) DEFAULT 'medium'
        CHECK (priority IN ('low', 'medium', 'high')),
    status VARCHAR(20) DEFAULT 'pending'
        CHECK (status IN ('pending', 'in_progress', 'completed')),
    due_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CREATE TABLE todos (
--     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--     user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--     title VARCHAR(255) NOT NULL,
--     description TEXT,
--     status VARCHAR(20) NOT NULL DEFAULT 'pending'
--         CHECK (status IN ('pending', 'in_progress', 'completed')),
--     priority VARCHAR(10) NOT NULL DEFAULT 'medium'
--         CHECK (priority IN ('low', 'medium', 'high')),
--     due_date TIMESTAMP,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
