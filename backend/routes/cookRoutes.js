const express = require('express');
const cookController = require('../controllers/cookController');
const authentication = require('../middlewares/authenticationMiddleware');

const router = express.Router();

router
    .route('/')
    .post(cookController.createCook)
    .delete(authentication, cookController.deleteCook);

router.post('/login', cookController.loginCook);
router.patch('/profile', authentication, cookController.updateCook);

module.exports = router;