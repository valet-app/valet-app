INSERT INTO car (usercar_id, parkingspacetype_id, make ,model, licenseplate, valettag, color) VALUES ($1,$2,$3,$4,$5,$6,$7)
RETURNING id; 