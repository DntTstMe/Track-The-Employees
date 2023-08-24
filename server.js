// Import required modules
const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');

// Create a MySQL connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'office_db',
});

// Connect to the database and start the application
connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log("Welcome to the Dunder Mifflin employee tracker");
  startMenu();
});

// Function to display the main menu
const startMenu = () => {
  inquirer.prompt({
    message: 'What would you like to do today?',
    name: 'menu',
    type: 'list',
    choices: [
      'View all departments',
      'View all jobs',
      'View all employees',
      'Add a department',
      'Add a job',
      'Add an employee',
      'Update employee job',
      'Exit',
    ],
  })
  .then(handleMenuChoice);
};

// Function to handle user menu choice
const handleMenuChoice = response => {
  switch (response.menu) {
    case 'View all departments':
      viewDepartment();
      break;
    case 'View all jobs':
      viewJobs();
      break;
    case 'View all employees':
      viewEmployees();
      break;
    case 'Add a department':
      addDepartment();
      break;
    case 'Add a job':
      addJob();
      break;
    case 'Add an employee':
      addEmployee();
      break;
    case 'Update employee job':
      updateEmployee();
      break;
    case "Exit":
      connection.end();
      break;
    default:
      connection.end();
  }
};

// Function to query the database and handle results
const queryDatabase = async (query, params, callback) => {
  try {
    const [rows, fields] = await connection.promise().query(query, params);
    displayResults(rows);
    callback();
  } catch (err) {
    console.error('Database query error:', err);
    callback();
  }
};

// Function to display query results
const displayResults = rows => {
  // rows.forEach(row => {
    console.table(rows);
  // });
};

// Function to view all departments
const viewDepartment = () => {
  const query = 'SELECT * FROM department';
  queryDatabase(query, [], startMenu);
};

// Function to view all jobs
const viewJobs = () => {
  const query = 'SELECT * FROM job';
  queryDatabase(query, [], startMenu);
};

// Function to view all employees
const viewEmployees = () => {
  const query = 'SELECT e.id, e.first_name, e.last_name, j.title, j.salary, d.dept_name, e.manager_id FROM employee as e LEFT JOIN job as j ON e.job_id = j.id LEFT JOIN department as d ON j.department_id = d.id;';
  queryDatabase(query, [], startMenu);
};

// Function to add a department
const addDepartment = () => {
  inquirer.prompt([
    {
      name: 'department',
      type: 'input',
      message: 'What is the department name?',
    },
  ])
  .then(answer => {
    const query = 'INSERT INTO department (dept_name) VALUES (?)';
    queryDatabase(query, [answer.department], startMenu);
    // console.log('Department Created!')
  });
};

// Function to add a job
const addJob = () => {
  inquirer.prompt([
    {
      name: 'jobTitle',
      type: 'input',
      message: 'What is the job title?',
    },
    {
      name: 'salary',
      type: 'input',
      message: 'What is the salary for this job?',
    },
    {
      name: 'deptId',
      type: 'input',
      message: 'What is the department ID number?',
    },
  ])
  .then(answer => {
    const query = 'INSERT INTO job (title, salary, department_id) VALUES (?, ?, ?)';
    queryDatabase(query, [answer.jobTitle, answer.salary, answer.deptId], startMenu);
  });
};

// Function to add an employee
const addEmployee = () => {
  inquirer.prompt([
    {
      name: 'nameFirst',
      type: 'input',
      message: "What is the employee's first name?",
    },
    {
      name: 'nameLast',
      type: 'input',
      message: "What is the employee's last name?",
    },
    {
      name: 'jobId',
      type: 'input',
      message: "What is the employee's job id?",
    },
    {
      name: 'managerId',
      type: 'input',
      message: 'What is the manager Id?',
    },
  ])
  .then(answer => {
    const query = 'INSERT INTO employee (first_name, last_name, job_id, manager_id) VALUES (?, ?, ?, ?)';
    queryDatabase(query, [answer.nameFirst, answer.nameLast, answer.jobId, answer.managerId], startMenu);
  });
};

// Function to update an employee's job
const updateEmployee = () => {
  inquirer
    .prompt([
      {
        name: 'id',
        type: 'input',
        message: 'Enter employee id',
      },
      {
        name: 'jobId',
        type: 'input',
        message: 'Enter new job id',
      },
    ])
    .then(answer => {
      const query = 'UPDATE employee SET job_id=? WHERE id=?';
      queryDatabase(query, [answer.jobId, answer.id], startMenu);
    });
};

// Export the connection for use in other modules
module.exports = connection;