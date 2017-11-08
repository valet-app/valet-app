SELECT c.id as company_id,
    c.name as companyname,
    pl.id as parkinglot_id,
    pl.name as parkinglotname,
    pl.address as parkinglotaddress,
    pst.id AS parkingspacetype_id,
    type as parkingspacetype,
    location1,
    location2,
    location3,
    location4,
    location5,
    car.make,
    car.model,
    car.licenseplate,
    car.color,
    car.lastchange,
    coalesce(s.status,'Open') AS parkingstatus,
    e.name AS parkedby

FROM parkinglot pl
    JOIN company c on pl.company_id = c.id
    JOIN parkingspace ps on pl.id = ps.parkinglot_id
    JOIN parkingspacetype pst on ps.parkingspacetype_id = pst.id
    LEFT JOIN car on ps.id = car.parkingspace_id
    LEFT JOIN employee e on car.employee_id = e.id
    LEFT JOIN parkingstatus s on car.status_id = s.id

WHERE	pl.id = $1