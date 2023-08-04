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

function displayMenu()
{
    inquirer.prompt([
        {
          name: 'homescreen',
          type: 'list',
          message: 'What would you like to do?',
          choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View all Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
          pageSize: 8,
        },
      ])
      .then((answers) =>{
          var userChoice = answers.homescreen;
      
          console.log("This is my user choice " + userChoice);
      
          if(userChoice == "View All Employees")
          {
              console.log("You chose the view employee option");
              displayMenu();
              
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
              ])
              .then((employeeAnswer) =>{
                const firstName = employeeAnswer.firstName;
                const lastName = employeeAnswer.lastName;

                console.log("Employee First Name: " + firstName);
                console.log("Employee Last Name: " + lastName);
                displayMenu();
              })
          }
      
          else if(userChoice == "Update Employee Role")
          {
              console.log("You chose the update employee route");
              displayMenu();
          }
      
          else if(userChoice == "View all Roles")
          {
              console.log("You chose the view all roles route");
              displayMenu();
          }
      
          else if(userChoice == "Add Role")
          {
              console.log("You chose the add role route");
              displayMenu();
          }
      
          else if(userChoice == "View All Departments")
          {
              console.log("You chose the view all department routes");
              displayMenu();
          }
      
          else if(userChoice == "Add Department")
          {
            console.log("Please add an department!");
            inquirer.prompt([
              {
                  type: "input",
                  name: "departmentName",
                  message: "Please enter a department name!"
              },
            ])
            .then((departmentAnswer) =>{
              const addedDepartment = departmentAnswer.departmentName;

              console.log("Department Name Added: " + addedDepartment);

              displayMenu();
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

// module.export = query;