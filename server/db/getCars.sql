SELECT c.id AS car_id, c.parkingspacetype_id, make, model, licenseplate, valettag, status_id, parkingspace_id,
    color, c.employee_id, u.id AS user_id, firstname, lastname, phone, ps.parkinglot_id, ps.location1,
    ps.location2, ps.location3, ps.location4, ps.location5, floor(random() * (3-1+1) + 1)
::int AS ranking

FROM car c
    JOIN usercar uc ON c.id = uc.car_id
    JOIN users u ON uc.user_id = u.id
    LEFT JOIN parkingspace ps ON c.parkingspace_id = ps.id

WHERE
(c.id = $1 OR $1 IS NULL);