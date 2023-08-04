/*Pseudocode

We want to choose what we want to do in the beginning. That what the inquiry will be for.
Give employees a list of options on what they want to do and with the options, it will lead down certain paths.
Options will be 
1. view all departments
2. view all roles
3. view all employees
4. add a department 
5.add a role
6. add an employee
7. update an employee role

First thing we have to do, is create the company databases

1. View All Departments
We see a SQL table of all the departments. We're going to have to create a department table

2. View all roles
We see a sql table of every role that is available. We're going to have to create a roles table

3. View all employees
We see a sql table of every employee in the company. We're going to have to create an employee table.

4. Add a department
add a department to the department table. So add a department to the department table

5. Add a role
We're going to have to add a role to the role table

 6. Add an employee
We're going to have to add employee information to the employee table

7. Update an employee role
Edit the employee table to fix the employee role.

*/

const fs = require('fs');
const inquirer = require('inquirer');
const mysql = require('mysql2');
// const connection = require('./db/connection');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password123',
    database: 'company_db',
  });

function displayMenu()
{
    inquirer.prompt([
        {
          name: 'homescreen',
          type: 'list',
          message: 'What would you like to do?',
          choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View all Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
        },
      ])
      .then((answers) =>{
          var userChoice = answers.homescreen;
      
          console.log("This is my user choice " + userChoice);
      
          if(userChoice == "View All Employees")
            {
                console.log("Please see all the Employees.");
                    const viewAllEmployeesQuery = `
                    SELECT employees.id AS id, employees.first_name AS first_name, employees.last_name AS last_name, roles.title AS title, department.department_name AS department, roles.salary AS salary, CONCAT(managers.first_name, " ", managers.last_name) AS manager
                    FROM employees
                    JOIN roles ON employees.role_id = roles.id
                    JOIN department ON roles.department_id = department.id
                    LEFT JOIN employees AS managers ON employees.manager_id = managers.id;
                    `;
                    connection.query(viewAllEmployeesQuery, function (err, results) {
                    if (err) throw err;
                    // Print the results in a formatted way
                    console.log("");
                    console.table(results);
                    displayMenu();
                    })
                
            } 
      
          else if(userChoice == "Add Employee")
          {
              console.log("Please add an employee!");
              inquirer.prompt([
                {
                    type: "input",
                    name: "firstName",
                    message: "Please enter employee first name!"
                },
                {
                    type: "input",
                    name: "lastName",
                    message: "Please enter employee last name!"
                },
                {
                    type: "list",
                    name: "roleID",
                    message: "Please select employee role!",
                    choices:["Sales Lead", "Lead Engineer", "Software Engineer", "Lawyer", "Accountant"],
                },
                {
                    type: "list",
                    name: "managerID",
                    message: "Please select a manager!",
                    choices:["Lebron James", "Clive Rosfield"],
                },
              ])
              .then((employeeAnswer) =>{
                const firstName = employeeAnswer.firstName;
                const lastName = employeeAnswer.lastName;
                const userRoleChoice = employeeAnswer.roleID;
                const userManagerChoice = employeeAnswer.managerID;

                let idNumberAssigned;
                let managerAssigned;


                if(userRoleChoice == "Sales Lead")
                {
                    idNumberAssigned = 1;
                }
                else if(userRoleChoice == "Lead Engineer")
                {
                    idNumberAssigned = 2;
                }
                else if(userRoleChoice == "Software Engineer")
                {
                    idNumberAssigned = 3;
                }
                else if(userRoleChoice == "Lawyer")
                {
                    idNumberAssigned = 4;
                }
                else if(userRoleChoice == "Accountant")
                {
                    idNumberAssigned = 5;
                }

                if(userManagerChoice == "Lebron James")
                {
                    managerAssigned = 1;
                }
                else if(userManagerChoice == "Clive Rosfield")
                {
                    managerAssigned = 4;
                }


                console.log("Employee First Name: " + firstName);
                console.log("Employee Last Name: " + lastName);
                const addEmployeeInformation = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;

                connection.query(
                    addEmployeeInformation,[firstName, lastName, idNumberAssigned, managerAssigned], 
                    function (err, insertResult)
                    {
                        if (err) throw err;
                        console.log("Employee added successfully!");
                        displayMenu();
                    }
                )
              })
          }
      
          else if (userChoice == "Update Employee Role") {
            console.log("You chose the update employee route");
        
            inquirer.prompt([
                {
                    type: "list",
                    name: "employee",
                    message: "Please select an employee!",
                    choices: ["Lebron James", "Joey Lee", "Bobby Portis", "Clive Rosfield", "Torgal WOOF"]
                },
                {
                    type: "list",
                    name: "role",
                    message: "Please select role!",
                    choices: ["Sales Lead", "Lead Engineer", "Software Engineer", "Lawyer", "Accountant"]
                }
            ])
            .then((updateAnswer) => {
                const selectedEmployee = updateAnswer.employee;
                const selectedRole = updateAnswer.role;
        
                let idNumberAssigned;
        
                if (selectedRole == "Sales Lead") {
                    idNumberAssigned = 1;
                } else if (selectedRole == "Lead Engineer") {
                    idNumberAssigned = 2;
                } else if (selectedRole == "Software Engineer") {
                    idNumberAssigned = 3;
                } else if (selectedRole == "Lawyer") {
                    idNumberAssigned = 4;
                } else if (selectedRole == "Accountant") {
                    idNumberAssigned = 5;
                }
        
                const updateEmployeeInformation = `
                    UPDATE employees
                    SET role_id = ?
                    WHERE CONCAT(first_name, ' ', last_name) = ?;
                `;
        
                connection.query(updateEmployeeInformation, [idNumberAssigned, selectedEmployee], function (err, updateResult) {
                    if (err) throw err;
                    console.log("Employee role updated successfully!");
                    displayMenu();
                });
            });
        }
      
          else if(userChoice == "View all Roles")
            {
                console.log("Please see all the roles information.");
                    const viewAllEmployeesQuery = `
                    SELECT roles.id AS id, roles.title AS title, department.department_name AS department, roles.salary AS salary
                    FROM department
                    JOIN roles ON department.id = roles.department_id;
                    `;
                    connection.query(viewAllEmployeesQuery, function (err, results) {
                    if (err) throw err;
                    // Print the results in a formatted way
                    console.log("");
                    console.table(results);
                    displayMenu();
                    })
                
            }       
      
            else if(userChoice == "Add Role") {
                console.log("Please add a role.");
                inquirer.prompt([
                    {
                        type: "input",
                        name: "roleTitle",
                        message: "Please add a new role."
                    },
                    {
                        type: "number",
                        name: "salary",
                        message: "Please add a salary."
                    },
                    {
                        type: "list",
                        name: "department",
                        choices: ["Sales", "Engineering", "Finance", "Legal"]
                    },
                    ])
                  .then((employeeAnswer) => {
                    const roleTitle = employeeAnswer.roleTitle;
                    const salary = employeeAnswer.salary;
                    const department = employeeAnswer.department;
                    if (department === "Sales") {
                      idDepartment = 1;
                    } else if (department === "Engineering") {
                      idDepartment = 2;
                    } else if (department === "Finance") {
                      idDepartment = 3;
                    } else if (department === "Legal") {
                      idDepartment = 4;
                    }
                    const addRole = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
                    connection.query(
                        addRole,[roleTitle, salary, idDepartment],
                        function (err, insertResult)
                        {
                          if (err) throw err;
                          console.log(" New role added successfully!");
                          displayMenu();
                        }
                    )
                  })
                }
      
          else if(userChoice == "View All Departments")
            {
                console.log("Please see all the Departments.");
                    const viewAllEmployeesQuery = `
                    SELECT * FROM company_db.department;
                    `;
                    connection.query(viewAllEmployeesQuery, function (err, results) {
                    if (err) throw err;
                    // Print the results in a formatted way
                    console.log("");
                    console.table(results);
                    displayMenu();
                    })
                
            }      
            else if(userChoice == "Add Department") {
                console.log("Please add a department.");
                inquirer.prompt([
                    {
                        type: "input",
                        name: "departmentName",
                        message: "Please add a new department."
                    },
                    ])
                  .then((employeeAnswer) => {
                    const departmentName = employeeAnswer.departmentName;
                    const addDepartment = `INSERT INTO department (department_name) VALUES (?)`;
                    connection.query(
                        addDepartment,[departmentName],
                        function (err, insertResult)
                        {
                          if (err) throw err;
                          console.log(" New department added successfully!");
                          displayMenu();
                        }
                    )
                  })
                }

          else if(userChoice == "Quit")
          {
              console.log("You chose the quit route");
              return;
          }
          
      })
      
}

displayMenu();

