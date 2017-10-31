module.exports = {
    
        getCars: (req,res,next) => {
            console.log('returning car id# ', req.query.id);
            const db = req.app.get('db')
            db.get_cars(req.query.id)
                .then(response => {res.status(200).json(response);})
                .catch(  () => res.status(500).send() );
        },
        
        postCars: (req,res,next) => {
            console.log('adding new car id# ', req.body.model);
            const db = req.app.get('db')
            db.post_cars(req.body.usercar_id,req.body.parkingspacetype_id, req.body.make, req.body.model, req.body.licenseplate, req.body.valettag)
                .then(response => {res.status(200).json(response);})
                .catch(  () => res.status(500).send() );
        },
    
        updateCarsSpace: (req,res,next) => {
            console.log('returning update cars id# ', req.query.id, 'and new car', req.body);
            const db = req.app.get('db')
            db.updateCarsSpace([req.query.id,req.body.status_id,req.body.employee_id,req.body.parkingspace_id])
                .then(response => {res.status(200).json(response);})
                .catch(  () => res.status(500).send() );
        },
    
        deleteCars: (req,res,next) => {
        }
        
    }