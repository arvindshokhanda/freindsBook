const express = require('express');
const router = express.Router();

const userController = require('../controllers/user_controller');

router.get('/profile',  userController.profile);

///rendering singIn Page
router.get('/sign-in', userController.signIn);

//rendering signUp page
router.get('/sign-up', userController.signUp);

router.post('/create', userController.create);


module.exports = router;