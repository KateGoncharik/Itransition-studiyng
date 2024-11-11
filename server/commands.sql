SHOW DATABASES;
show tables;

-- миграция 1
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

ALTER TABLE forms MODIFY COLUMN date VARCHAR(255);
UPDATE forms SET date = "2024-11-01";

UPDATE users
SET `isAdmin` = 1
WHERE username = 'KateGon';