--Database
CREATE DATABASE speakeria;
USE speakeria;

--tables
CREATE TABLE users (
  id INT(10) NOT NULL AUTO_INCREMENT,
  username VARCHAR(50),
  name VARCHAR(50),
  lastname(50),
  password VARCHAR(250),
  PRIMARY KEY (id)

);

CREATE TABLE tokens (
  id INT(10) PRIMARY KEY AUTO_INCREMENT,
  content VARCHAR(300) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  userid INT(10) NOT NULL,
  CONSTRAINT fk_user FOREIGN KEY(userid) REFERENCES users(id)
);
