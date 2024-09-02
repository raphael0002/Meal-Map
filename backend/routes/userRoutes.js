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

router.post('/shopping-list', authentication, userController.addIngredientToShoppingList);
router.get('/shopping-list', authentication, userController.getShoppingList);
router.put('/shopping-list/:itemId', authentication, userController.updateShoppingList);

router.post('/planner', authentication, userController.planMeal);
router.get('/planner', authentication, userController.getPlanner);

module.exports = router;