const User = require('../models/user');
module.exports.signIn = function(req, res){
    return res.render('sign-in', {
        title: 'Sign In'
    });
}

module.exports.signUp = function(req, res){
    return res.render('sign-up', {
        title: 'Sign-Up'
    })
}

module.exports.create = async function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    try {
        let user = await User.findOne({email: req.body.email});
        //handle if user found
        if(user){
            //handle password not matching
            if(req.body.password != user.password){
                
                return res.redirect('back');
            }

            //password matched
            return res.redirect('/users/profile');
        }else{
            //if user with this email is not present
            
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error in creating user : ', err); return;
    }

}

module.exports.createSession = function(req, res){
    console.log(req.body);return res.redirect('back');
}