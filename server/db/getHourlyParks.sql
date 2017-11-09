SELECT count(al.id) as NumParked,
    to_char(al.tstamp- INTERVAL '6'
hour, 'HH12 PM') as HourOfDay
        
FROM 	activitylog al
		JOIN parkingspace ps on al.parkingspace_id = ps.id
        JOIN parkinglot pl on ps.parkinglot_id = pl.id
        
WHERE 	status_id = 2 AND company_id = $2 AND
(al.tstamp- INTERVAL '6' hour)::date = $1

GROUP BY to_char
(al.tstamp- INTERVAL '6' hour, 'HH12 PM')

