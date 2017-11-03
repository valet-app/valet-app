SELECT parkingspace.*, $3 AS theUserIs

FROM parkingspace LEFT JOIN car ON car.parkingspace_id = parkingspace.id

WHERE car.id is NULL AND parkinglot_id = $1 AND parkingspace.parkingspacetype_id = $2;