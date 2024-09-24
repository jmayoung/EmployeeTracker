import inquirer from 'inquirer';
import { pool } from './connection.js';

function query(sql, params) {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, res) => {
            if (err) {
                console.error('Error:', err);
                console.error('Failed query:', sql, 'with params:', params)
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

const mainMenu = async () => {
    const { choice } = await inquirer.prompt({
        type: 'list',
        name: 'choice',
        message: 'Choose an option:',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]
    });

    switch (choice) {
        case 'View all departments':
            await viewDepartments();
            console.log('Viewing departments');
            break;
        case 'View all roles':
            console.log('Viewing roles');
            await viewRoles();
            break;
        case 'View all employees':
            console.log('Viewing employees');
            await viewEmployees();
            break;
        case 'Add a department':
            console.log('Add new department name');
            await addDepartment();
            break;
        case 'Add a role':
            console.log('Add new role name');
            await addRole();
            break;
        case 'Add an employee':
            console.log('Add new employee name');
            await addEmployee();
            break;
        case 'Update an employee role':
            console.log('Updating role');
            await updateEmployeeRole();
            break;
        case 'Exit':
            console.log('Exiting application');
            process.exit();
            break;
    }
};

const viewDepartments = async () => {
    const res = await query('SELECT * FROM department');
    console.table(res.rows);
    await mainMenu();
};

const viewRoles = async () => {
    const res = await query(`
        SELECT r.id, r.title, r.salary, d.name AS department_name
        FROM role r
        JOIN department d ON r.department_id = d.id
    `);
    console.table(res.rows);
    await mainMenu();
};

const viewEmployees = async () => {
    const res = await query(`
        SELECT e.id, e.first_name, e.last_name,
               r.title AS job_title, d.name AS department_name, r.salary,
               m.first_name AS manager_first_name, m.last_name AS manager_last_name
        FROM employees e
        JOIN role r ON e.role_id = r.id
        JOIN department d ON r.department_id = d.id
        LEFT JOIN employees m ON e.manager_id = m.id
    `);
    console.table(res.rows);
    await mainMenu();
};

const addDepartment = async () => {
    const { name } = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter the departments name:'
    });
    await query('INSERT INTO department (name) VALUES ($1)', [name]);
    console.log('Department added successfully');
    await mainMenu();
};

const addRole = async () => {
    const departments = await query('SELECT * FROM department');
    const { title, salary, department_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the roles title:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the roles salary:'
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'Select the department:',
            choices: departments.rows.map(department => ({
                name: department.name,
                value: department.id
            }))
        }
    ]);
    await query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
    console.log('Role added successfully');
    await mainMenu();
};

const addEmployee = async () => {
    const roles = await query('SELECT * FROM role');
    const employees = await query('SELECT * FROM employees');
    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the employees first name:'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the employees last name:'
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Select the employees role:',
            choices: roles.rows.map(role => ({
                name: role.title,
                value: role.id
            }))
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Select the employees manager:',
            choices: [...employees.rows.map(employees => ({
                name: `${employees.first_name} ${employees.last_name}`,
                value: employees.id
            })), { name: 'None', 
                   value: null }]
        }
    ]);
    await query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
    console.log('Employee added successfully');
    await mainMenu();
};

const updateEmployeeRole = async () => {
    const employees = await query('SELECT * FROM employees');
    const roles = await query('SELECT * FROM role');
    const { employees_id, role_id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employees_id',
            message: 'Select an employees to update:',
            choices: employees.rows.map(employees => ({
                name: `${employees.first_name} ${employees.last_name}`,
                value: employees.id
            }))
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Select the new role:',
            choices: roles.rows.map(role => ({
                name: role.title,
                value: role.id
            }))
        }
    ]);
    await query('UPDATE employees SET role_id = $1 WHERE id = $2', [role_id, employees_id]);
    console.log('Employee role updated successfully');
    await mainMenu();
};

mainMenu();