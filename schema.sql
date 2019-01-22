DROP DATABASE IF EXISTS amazonne_db;
CREATE DATABASE amazonne_db;

USE amazonne_db;

CREATE TABLE inventory (
  id INT NOT NULL AUTO_INCREMENT,
  item_name VARCHAR(100) NOT NULL,
  category VARCHAR(45) NOT NULL,
  price DECIMAL (6,2) NOT NULL,
  features VARCHAR (350),
  additional_descriptors VARCHAR(300),
  number_available INT (4) NOT NULL,
  PRIMARY KEY (id)
);

-- ALTER TABLE inventory
-- ADD [COLUMN] number_available INT (4) NOT NULL;
