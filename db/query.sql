SELECT roles.id AS id, roles.title AS title, department.department_name AS department, roles.salary AS salary
-- reviews are JOINING reviews
FROM department
JOIN roles ON department.id = roles.department_id;