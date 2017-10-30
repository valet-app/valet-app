// load all the things we need
const passport = require('passport');
const LocalStrategy   = require('passport-local').Strategy;

// load up the user model
// var User = require('./db/model');

// load database
// const { knex } = require('./db/db');
// const { knex } = require('./db/db.js');
// const { User } = require('./db/model.js')

// load database
// const { validPassword, generateHash } = require('./apiCtrl/apiCtrl.js');

// expose this function to our app using module.exports
module.exports = function(passport) {   
    
    passport.use('login', new LocalStrategy( {
        usernameField: 'localuser', 
        passwordField: 'password',  
        passReqToCallback: true
    }, 
    
    function(req, username, password, done) {
        console.log('Local passport authentication');
        console.log('username is ', username);
        console.log('password is ', password);
        let user ={}
        
        User
            .where({username: username})
            .fetch(({withRelated: ['userstatus','usersecuritygroup.userpermission','usergroup']}))
            .then((user, err) => {
                    user = (user.toJSON() )
            
                if (!user) { //No User
                    console.log('NO USER FOUND')
                    return done(null, false);
                }
                
                if (!(validPassword(password, user.password))) {
                    console.log('BAD PASSWORD')
                    return done(null, false); 
                }
                
                
                else { //when we find the user, return it
                    console.log('FOUND USER', user.attributes);
                    return done(null, user);
                }
            })
            .catch((err) => {
                console.log('caught error')
                console.log(err)
            });
    })
    );

    passport.serializeUser(function(user, done) {
        console.log('serialized user')
        done(null, user);
        }); 

    passport.deserializeUser(function(user, done) {
        console.log('deserializeUser user')
        done(null, user);
        });   
};