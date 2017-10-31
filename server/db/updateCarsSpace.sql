UPDATE car SET status_id = $2, employee_id = $3, parkingspace_id = $4 WHERE id = $1;
SELECT * FROM car WHERE id = $1;