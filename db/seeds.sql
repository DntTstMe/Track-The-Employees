-- Seed departments
INSERT INTO department (dept_name)
VALUES 
('The Office'),
('Finances'),
('Customers');

-- Seed jobs with their departments
INSERT INTO job (title, salary, department_id)
VALUES 
('Branch Manager', 95000, 1),
('Branch Co-Manager', 65000, 1),
('Assistant Manager', 48000, 2),
('Receptionist', 20000, 3);

-- Seed employees with their jobs and managers
INSERT INTO employee (first_name, last_name, job_id, manager_id)
VALUES 
('Michael', 'Scott', 1, NULL),
('Jim', 'Halpert', 2, 1),
('Dwight', 'Schrute', 3, 2),
('Pam', 'Beesly', 4, 2);