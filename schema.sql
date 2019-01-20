CREATE DATABASE amazonne_db;

USE amazonne_db;

CREATE TABLE inventory (
  id INT NOT NULL AUTO_INCREMENT,
  item_name VARCHAR(100) NOT NULL,
  category VARCHAR(45) NOT NULL,
  price DECIMAL (6,2) NOT NULL,
  features VARCHAR (350),
  condition VARCHAR(300),
  PRIMARY KEY (id)
);

