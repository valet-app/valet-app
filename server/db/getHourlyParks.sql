SELECT count(al.id) as NumParked,
    to_char(al.tstamp- INTERVAL '6'
hour, 'HH12 PM') as HourOfDay
        
FROM 	activitylog al
		JOIN parkingspace ps on al.parkingspace_id = ps.id
        
WHERE 	status_id = 2 AND parkinglot_id = 1 AND tstamp::date = $1

GROUP BY to_char
(al.tstamp- INTERVAL '6' hour, 'HH12 PM')

