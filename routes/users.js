const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport');

router.get('/sign-in', usersController.signIn);
router.get('/sign-up', usersController.signUp);
router.post('/create', usersController.create);

//use passport as middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
),usersController.createSession);

router.get('/profile', passport.checkAuthentication, usersController.profile);

router.get('/sign-out', usersController.destroySession);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), usersController.createSession);

router.get('/reset-password', usersController.resetPassword);
router.post('/update-password', usersController.updatePassword);
module.exports = router;