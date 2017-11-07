module.exports = {

    getUser: (req,res,next) => {
        const db = req.app.get('db')
        console.log('returning user id# ', req.query.id);
        db.getUser(req.query.id)
            .then(response => { res.status(200).json(response); })
            .catch( () => res.status(500).send() );
    },

    postUser: (req,res,next) => {
        const db = req.app.get('db')
        console.log(req.body);
        db.postUser(req.body.firstname, req.body.lastname,req.body.email, req.body.phone)
        .then(response => {res.status(200).json(response);})
        .catch(  () => res.status(500).send() );
    },

    putUser: (req,res,next) => {
    },

    deleteUser: (req,res,next) => {
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