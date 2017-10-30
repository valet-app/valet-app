// Bring in our required modules
const express    = require('express');;
const { json }   = require('body-parser');
const session    = require('express-session');
const massive    = require('massive');
const passport   = require('passport');
const bcrypt     = require('bcrypt-nodejs');
const dotenv     = require('dotenv');
const { Client } = require('pg');

require('dotenv').load();

// App Declaration
const app = express();
const router = express.Router();
app.use('/api', router);

// required middlewares
app.use(json());

app.use(express.static(`${__dirname}/../client/public`));

// setting up express sessions
// secret: config.session.secret;
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true 
}));

// setting up passport
app.use(passport.initialize());
app.use(passport.session());

require('./passport')(passport); 

const massiveConnection = massive(process.env.DATABASE_URL)
    .then(db => {
        app.set('db',db); 
    })
    .catch(err => {
        console.log(err)
    })


const userCtrl = require ('./routes/userCtrl')

// General Endpoints
app.get('/api/user', userCtrl.getAll)

// listen on port
app.listen(process.env.PORT, ()=> {
    console.log(`LISTENING ON PORT: ${process.env.PORT}`);
});
