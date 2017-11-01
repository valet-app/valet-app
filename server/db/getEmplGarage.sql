SELECT  e.id AS employee_id,
        c.name AS company_name,
        c.id AS company_id,
        pl.name AS parkinglot_name,
        pl.id AS parkinglot_id

FROM    employee e
        JOIN parkinglot pl ON e.company_id = pl.company_id 
        JOIN company c ON pl.company_id = c.id      

WHERE   e.id = $1;
