SELECT c.id AS car_id, c.parkingspacetype_id, make, model, licenseplate, valettag, status_id, parkingspace_id,
    color, c.employee_id, u.id AS user_id, firstname, lastname, phone, ps.parkinglot_id, ps.location1,
    ps.location2, ps.location3, ps.location4, ps.location5, frequency.ranking, frequency.num AS parkingfreg

FROM car c
    JOIN usercar uc ON c.id = uc.car_id
    JOIN users u ON uc.user_id = u.id
    LEFT JOIN parkingspace ps ON c.parkingspace_id = ps.id

    LEFT JOIN
    (
                (SELECT count(tstamp) AS num, car_id, 1 as ranking
    FROM activitylog
    WHERE	car_id IS NOT NULL
    GROUP BY car_id
    ORDER BY num desc
                LIMIT (SELECT count(id)/3 from car))

                UNION (SELECT count  
(tstamp)
AS num, car_id, 2 as ranking 
                FROM 	activitylog
                WHERE	car_id IS NOT NULL
                GROUP BY car_id
                ORDER BY num desc
                LIMIT
(SELECT count(id)/3
from car)
OFFSET
(SELECT count(id)/3
from car)
)
    ) AS frequency on c.id = frequency.car_id



WHERE
(c.id = $1 OR $1 IS NULL);