const express = require('express');
const cookController = require('../controllers/cookController');
const authentication = require('../middlewares/authenticationMiddleware');

const router = express.Router();

router
    .route('/')
    .post(cookController.createCook)
    .delete(authentication, cookController.deleteCook);

router.post('/login', cookController.loginCook);
router.get('/profile', authentication, cookController.getCookData);
router.patch('/profile', authentication, cookController.updateCook);

router.get('/recipes', authentication, cookController.getRecipesByCook);

module.exports = router;