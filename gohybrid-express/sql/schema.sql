DROP TABLE users;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(200),
    email VARCHAR(500),
    password VARCHAR(500)
);