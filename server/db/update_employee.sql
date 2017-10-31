UPDATE employee SET isactive = $2 WHERE id = $1;
SELECT * FROM employee WHERE id = $1;