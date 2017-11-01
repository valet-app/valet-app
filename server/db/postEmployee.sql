INSERT INTO employee (company_id, username, name, admin, password) VALUES ($1,$2,$3,$4,$5);
SELECT * FROM employee WHERE username = $2;