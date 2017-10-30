module.exports = {

    getEmpl: (req,res,next) => {
        console.log('returning employee id# ', req.query.id);
        const db = req.app.get('db')
        db.get_employee(req.query.id, req.query.username)
            .then(response => {res.status(200).json(response);})
            .catch(  () => res.status(500).send() );
    },
    
    postEmpl: (req,res,next) => {
    },

    putEmpl: (req,res,next) => {
    },

    deleteEmpl: (req,res,next) => {
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
