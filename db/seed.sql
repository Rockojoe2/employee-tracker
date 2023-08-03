INSERT INTO department (department_name)
    VALUES
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");


INSERT INTO roles (title, salary, department_id)
    VALUES
    ("Sales Lead", 100000, 1),
    ("Lead Engineer", 2000000, 2),
    ("Software Engineer", 300000, 2),
    ("Lawyer", 100000, 4),
    ("Accountant", 50000, 3);

    INSERT INTO roles (first_name, last_name, role_id, manager_id)
    VALUES
    ("Lebron", "James", 3, null),
    ("Joey", "Lee", 3, 1),
    ("Bobby", "Portis", 3, 1),
    ("Clive", "Rosfield", 4, null),
    ("Torgal", "WOOF", 4, 4);


   