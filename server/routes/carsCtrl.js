module.exports = {
    
        getCars: (req,res,next) => {
            console.log('returning car id# ', req.query.id);
            const db = req.app.get('db')
            db.get_cars(req.query.id)
                .then(response => {res.status(200).json(response);})
                .catch(  () => res.status(500).send() );
        },
        
        postCars: (req,res,next) => {
        },
    
        putCars: (req,res,next) => {
        },
    
        deleteCars: (req,res,next) => {
        }
        
    }