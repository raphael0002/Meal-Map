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

router.patch('/shopping-list', authentication, userController.addIngredientToShoppingList);
router.get('/shopping-list', authentication, userController.getShoppingList);
router.delete('/shopping-list/:ingredientId', authentication, userController.deleteShoppingListItem);

router.post('/planner', authentication, userController.planMeal);
router.get('/planner', authentication, userController.getPlanner);
router.patch('/planner/:plannerId', authentication, userController.deletePlanner);

router.get('/profile', authentication, userController.getUserData);

module.exports = router;