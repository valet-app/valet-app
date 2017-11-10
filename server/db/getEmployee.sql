SELECT em.id, em.name, em.admin, em.username, em.password, em.isactive, em.isvalet, p.company_id, p.address, p.name as lotname
FROM employee em LEFT JOIN parkinglot p on em.company_id = p.company_id
WHERE (em.id = $1 OR $1 IS NULL)
    AND (em.username = $2 OR $2 IS NULL)