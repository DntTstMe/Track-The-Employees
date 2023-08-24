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