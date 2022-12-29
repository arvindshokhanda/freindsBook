const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user_controller');

router.get('/profile/:id', passport.checkAuthentication,  userController.profile);
router.post('/update/:id', passport.checkAuthentication,  userController.update );


///rendering singIn Page
router.get('/sign-in', userController.signIn);

//rendering signUp page
router.get('/sign-up', userController.signUp);

router.post('/create', userController.create);

// router.post('/create-session', userController.createSession);

router.get('/sign-out', userController.destroySession);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), userController.createSession);
module.exports = router;