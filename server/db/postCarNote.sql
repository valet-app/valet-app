INSERT INTO carnotes
    (car_id, notes)
VALUES
    ($1, $2);

SELECT * FROM carnotes WHERE car_id=$1