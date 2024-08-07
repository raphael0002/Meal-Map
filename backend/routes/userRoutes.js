const express = require('express');
const userController = require('../controllers/userController');
const authentication = require('../middlewares/authenticationMiddleware');

const router = express.Router();

router
    .route('/')
    .post(userController.createUser)
    .delete(authentication, userController.deleteUser);

router.post('/login', userController.loginUser);
router.patch('/profile', authentication, userController.updateUser);

module.exports = router;