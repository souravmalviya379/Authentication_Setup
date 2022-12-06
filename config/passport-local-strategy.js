const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');

//function to compare user provided plaintextpassword and hash password stored in db
async function comparePassword(plaintextPassword, hash){
    result = await bcrypt.compare(plaintextPassword, hash);
    return result;
}

//authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
    async function(req, email, password, done){
        //find the user and establish identity
        User.findOne({email: email}, async function(err, user){
            if(err){
                console.log('Error in finding user --> passport');
                return done(err);
            }
            // if user is not fount or password not matching with database password
            if(!user || !(await comparePassword(password, user.password))){
                console.log('Invalid Username/Password');
                req.flash('Invalid Username/Password !!!');
                return done(null, false);   //no error but authentication is false
            }

            return done(null, user);
        })
    }
));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
})

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> passport');
            return done(err);
        }

        return done(null,user);
    })
})

//check if the user is authenticated 
passport.checkAuthentication = function(req, res, next){
    //if user is signed in, then pass the request to next function(controller's function)
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for using in the views
        res.locals.user = req.user; 
    }
    next();
}

module.exports = passport;