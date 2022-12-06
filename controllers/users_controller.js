const User = require('../models/user');
const passport = require('passport');
const bcrypt = require('bcrypt');

async function hashPassword(plaintextPassword){
    const hash = await bcrypt.hash(plaintextPassword, 10);
    return hash;
}

module.exports.signIn = function (req, res) {
    return res.render('sign-in', {
        title: 'Sign In'
    });
}

module.exports.profile = function (req, res) {
    return res.render('profile', {
        title: 'My Profile'
    });
}

module.exports.signUp = function (req, res) {
    return res.render('sign-up', {
        title: 'Sign-Up'
    })
}

module.exports.create = async function (req, res) {
    if (req.body.password != req.body.confirm_password) {

        req.flash('error', 'Password and Confirm password not matching !!!');
        return res.redirect('/users/sign-up');
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            req.flash('error', 'User already exists !!!');
            return res.redirect('/users/sign-in');
        }
        if (!user) {
            // encrypting the password before storing it into the database
            let hash_password = await hashPassword(req.body.password);

            //creating the user and storing hash password in the db
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hash_password
            });

            req.flash('success', 'Registration Successful !!!');
            return res.redirect('/users/sign-in');
        }
    } catch (err) {
        console.log('Error in creating user : ', err); return;
    }

}

module.exports.createSession = function (req, res) {
    req.flash('success', 'You have logged In !!!');
    return res.redirect('/users/reset-password');
}

module.exports.resetPassword = function (req, res) {
    if (!req.user) {
        return res.redirect('/users/sign-in');
    }
    return res.render('reset-password', {
        title: 'Reset Password'
    });
}

module.exports.updatePassword = async function (req, res) {
    try {
        const user = await User.find({ email: req.body.email });
        if(req.user.email != user[0].email){
            req.flash('error', 'Please enter correct username with which you are logged in');
            return res.redirect('back');
        }
        
        //if user doesn't exists
        if (!user) {
            req.flash('error', 'Please enter the correct username !!!');
            return res.redirect('back');
        } else {
            //if user exists
            //checking if new password and confirm password are same or not
            if (req.body.new_pass != req.body.confirm_pass) {
                req.flash('error', 'New Confirm password not matching !!!');
                return res.redirect('back');
            }

            //encrypting the password before updating it into the database
            let hash_password = await hashPassword(req.body.new_pass);
            
            await User.findByIdAndUpdate(user[0]._id, { password: hash_password });
            req.flash('success', 'Password updated Successfully !!!');
            return res.redirect('/');
        }
    } catch (error) {
        console.log('Error in updating password : '+error);
        req.flash('error', 'Error in updating password !!!');
        return res.redirect('back');
    }

    console.log(req.body)
}

module.exports.destroySession = function (req, res) {
    req.logout((err) => {
        if (err) {
            return nextTick(err);
        }
        req.flash('success', 'You have logged Out !!!');
        return res.redirect('/');
    });   //this function is provided by passport to request

}