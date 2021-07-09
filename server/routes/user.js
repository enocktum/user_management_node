const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//view user route
router.get('/', userController.view);
router.post('/viewuser', userController.allInfo);
//find user route
router.post('/', userController.find);

//add user routes
router.get('/adduser', userController.addForm);
router.post('/adduser', userController.postForm);

//edit user routes
router.post('/edituser', userController.postEditForm);
router.post('/editusersuccess', userController.postEditSuccess);

//delete user routs
router.post('/deleteuser', userController.postDeleteSuccess);


//exports
module.exports = router;