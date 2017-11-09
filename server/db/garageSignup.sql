INSERT INTO parkinglot (name, address, company_id) VALUES ($1, $2, $3) RETURNING id;
