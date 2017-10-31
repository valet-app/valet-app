INSERT INTO car (usercar_id, parkingspacetype_id, make ,model, licenseplate, valettag) VALUES ($1,$2,$3,$4,$5,$6)
RETURNING id; 