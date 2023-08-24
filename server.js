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