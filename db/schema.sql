DROP DATABASE IF EXISTS office_db;
CREATE DATABASE office_db;

USE office_db;

DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS job;
DROP TABLE IF EXISTS employee;

-- Create department table
CREATE TABLE department (
  id INT PRIMARY KEY AUTO_INCREMENT,
  dept_name VARCHAR(255) NOT NULL
);

-- Create roles table
CREATE TABLE job (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT
);

-- Create employees table
CREATE TABLE employee (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  job_id INT,
  manager_id INT
);