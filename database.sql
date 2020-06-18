CREATE DATABASE todo_database;

-- \c DATABASE to get into the database in psql shell

CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(255)
);