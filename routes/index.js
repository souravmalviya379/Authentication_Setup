const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');

router.get('/users/sign-in', usersController.signIn);
router.get('/users/sign-up', usersController.signUp);
router.post('/users/create', usersController.create);
router.post('/users/create-session', usersController.createSession);

router.get('/', (req, res)=>{
    return res.render('home', {
        title: "Home Page"
    })
})
module.exports = router;