SELECT count(al.id) as NumParked,
    s.status,
    al.status_id,
    e.name


FROM activitylog al
    JOIN parkingspace ps on al.parkingspace_id = ps.id
    JOIN employee e ON al.employee_id = e.id
    JOIN parkingstatus s on al.status_id = s.id
    JOIN parkinglot pl on ps.parkinglot_id = pl.id

WHERE 	status_id IN (2,4) AND pl.company_id = $2 AND
    (al.tstamp- INTERVAL
'6' hour)::date = $1

GROUP BY e.name, s.status, al.status_id;