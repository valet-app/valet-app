module.exports = {

    getEmpl: (req,res,next) => {
        console.log('returning employee id# ', req.query.id);
        const db = req.app.get('db')
        db.get_employee(req.query.id, req.query.username)
            .then(response => {res.status(200).json(response);})
            .catch(  () => res.status(500).send() );
    },
    
    postEmpl: (req,res,next) => {
        console.log('adding new employee id# ', req.body.id);
        const db = req.app.get('db')
        db.post_employee(req.body.company_id, req.body.username,req.body.name, req.body.admin, req.body.password)
            .then(response => {res.status(200).json(response);})
            .catch(  () => res.status(500).send() );
    },

    putEmpl: (req,res,next) => {
        const db = req.app.get('db')
        db.update_employee([req.query.id, req.body.isactive])
            .then(response => {
                res.status(200).json(response);
            })
            .catch(  () => res.status(500).send() );
    },

    deleteEmpl: (req,res,next) => {
    },

    
    getEmplGarage: (req,res,next) => {
    console.log('returning employee id# ', req.query.id);
    const db = req.app.get('db')
    db.get_EmplGarage(req.query.id)
        .then(response => {res.status(200).json(response);})
        .catch(  () => res.status(500).send() );
    }
    
}



// const create = (req,res,next) => {
//     const db = req.app.get('db')
//     db.create_product([req.body.name, req.body.description,req.body.price,req.body.imageurl])
//         .then(response => {
//             res.status(200).json(response);
//         })
//         .catch(  () => res.status(500).send() );
// };



// const update = (req,res,next) => {
//     const db = req.app.get('db')
//     db.update_product([req.params.id,req.query.desc])
//         .then(response => {
//             res.status(200).json(response);
//         })
//         .catch(  () => res.status(500).send() );
// };




// const remove = (req,res,next) => {
//     const db = req.app.get('db')
//     db.delete_product([req.params.id])
//         .then(response => {
//             res.status(200).json(response);
//         })
//         .catch(  () => res.status(500).send() );
// };
