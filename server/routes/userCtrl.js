const getAll = (req,res,next) => {
    console.log('trying to get all users')
    const db = req.app.get('db')
    db.get_user()
        .then(response => {
            console.log(response)
            res.status(200).json(response);
        })
        .catch(  () => res.status(500).send() );
};


const getOne = (req,res,next) => {
    const db = req.app.get('db')
    db.read_product([req.params.id])
        .then(response => {
            res.json(response);
        })
        .catch(  () => res.status(500).send() );
};



const create = (req,res,next) => {
    const db = req.app.get('db')
    db.create_product([req.body.name, req.body.description,req.body.price,req.body.imageurl])
        .then(response => {
            res.status(200).json(response);
        })
        .catch(  () => res.status(500).send() );
};



const update = (req,res,next) => {
    const db = req.app.get('db')
    db.update_product([req.params.id,req.query.desc])
        .then(response => {
            res.status(200).json(response);
        })
        .catch(  () => res.status(500).send() );
};




const remove = (req,res,next) => {
    const db = req.app.get('db')
    db.delete_product([req.params.id])
        .then(response => {
            res.status(200).json(response);
        })
        .catch(  () => res.status(500).send() );
};




module.exports = {
    create,
    getOne,
    getAll,
    update,
    remove
}