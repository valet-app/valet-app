module.exports = {
    
        postCompany: (req,res,next) => {
            console.log('adding new company ', req.body.name);
            const db = req.app.get('db')
            db.postCompany(req.body.name)
                .then(response => {res.status(200).json(response);})
                .catch(  () => res.status(500).send() );
        }
        
    }
    
    
    