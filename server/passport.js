// load all the things we need
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// load database
// const { validPassword, generateHash } = require('./apiCtrl/apiCtrl.js');

// expose this function to our app using module.exports
module.exports = function(passport) {
  passport.use(
    "local",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
      },

      function(req, username, password, done) {
        console.log("Local passport authentication");
        console.log("username is ", username);
        console.log("password is ", password);
        let user = {};

        const db = req.app.get("db");

        db
          .getEmployee(null, username)
          .then(response => {
            user = response[0];
            console.log("The response is:");
            console.log(user);

            if (!user) {
              //No User
              console.log("NO USER FOUND");
              return done(null, false);
            }

            if (!(password == user.password)) {
              //Bad Password
              console.log("BAD PASSWORD");
              return done(null, false);
            } else {
              //when we find the user, return it
              console.log("FOUND USER", user.username);
              return done(null, user);
            }
          })
          .catch(err => {
            console.log(err, "Caught Error");
            res.status(500).send();
          });
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
};
