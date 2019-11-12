var express = require('express');
var router = express.Router();
var userController = require('../controller/UserController') ;
let middleware = require('../middleware/verifyToken');

//Register
router.post('/register', userController.register);

//Login
router.post('/login', userController.login);

//User Profile
router.get('/userProfile',middleware.verifyToken,userController.getUserProfile);
//router.get('/userProfile',userController.getUserProfile);
router.put('/userProfile',middleware.verifyToken, userController.editUserProfile);

//Employer Profile
router.get('/employerProfile',middleware.verifyToken, userController.getEmployerProfile);
router.put('/employerProfile',middleware.verifyToken, userController.editEmployerProfile);

module.exports = router;
