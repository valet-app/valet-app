module.exports = {
    
        getParkingSpot: (req,res,next) => {
            const db = req.app.get('db')
            console.log('returning lot id# ', req.query.lotid, ' and type id = ', req.query.typeid);
            db.getParkingSpot(req.query.lotid, req.query.typeid)
                .then(response => { res.status(200).json(response); })
                .catch( () => res.status(500).send() );
        },
    
        // postUser: (req,res,next) => {
        // },
    
        // putUser: (req,res,next) => {
        // },
    
        // deleteUser: (req,res,next) => {
        // }
    
    }