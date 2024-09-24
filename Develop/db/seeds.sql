INSERT INTO department (name) VALUES
('GIS'),
('Legal'),
('Manager');

INSERT INTO role (title, salary, department_id) VALUES
('GIS Specialist', 3, 1),
('Lawyer', 3, 2),
('General Manager', 900000000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('Julia', 'Young', 1, 3),
('Alex', 'Milona', 2, 3),
('Tracy', 'Jacks', 3, NULL);
