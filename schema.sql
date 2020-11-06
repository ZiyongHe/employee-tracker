-- Drops the task_saver_db if it already exists --
DROP DATABASE IF EXISTS employee_tracker_db;

-- Create the database task_saver_db and specified it for use.
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

-- Create table - department.
CREATE TABLE department (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `department` VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE `role` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(30) NOT NULL,
  `salary` DECIMAL(10,0) NOT NULL,
  `department_id` INTEGER NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
	`employee_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(30) NOT NULL,
    `last_name` VARCHAR(30) NOT NULL,
    `role_id` INTEGER NOT NULL,
    `manager_id` INTEGER,
    PRIMARY KEY (employee_ID)
);

INSERT INTO employee (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ("Ziyong", "He", 1, 1);
INSERT INTO employee (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ("Chris", "Wu", 1, 1);
INSERT INTO `role` (`id`,`title`,`salary`,`department_id`) VALUES (1, "Web Developer", 60000, 1);
INSERT INTO `role` (`id`,`title`,`salary`,`department_id`) VALUES (2, "Engineer", 70000, 2);
INSERT INTO department (`department`) VALUES ("Information Technology");
INSERT INTO department (`department`) VALUES ("Engineering Managment");


SELECT * FROM employee, `role`, department;

SELECT employee_ID, first_name, last_name, title, salary, department FROM employee LEFT JOIN `role` ON  `role`.id = employee.role_id LEFT JOIN department ON department.id = department_id;
SELECT * FROM `role`;
SELECT * From department;
