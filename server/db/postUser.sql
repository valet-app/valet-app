INSERT INTO users (firstname,lastname,email, phone) VALUES ($1,$2,$3,$4) returning id;