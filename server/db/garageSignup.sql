INSERT INTO parkinglot (name, address) VALUES ($1, $2) RETURNING id;
