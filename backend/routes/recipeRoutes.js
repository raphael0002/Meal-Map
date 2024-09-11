const express = require('express');
const recipeController = require('../controllers/recipeController');
const authentication = require('../middlewares/authenticationMiddleware');

const router = express.Router();

router
    .route('/')
    .post(authentication, recipeController.createRecipe)
    .delete(authentication, recipeController.deleteRecipe);

router.get('/recipeByTitle/:title',authentication, recipeController.getRecipeByTitle);
router.get('/recipes',authentication, recipeController.getRecipes);
router.get('/recipeByCategory/:category',authentication, recipeController.getRecipeByCategory); 
router.patch('/:recipeId/:title',authentication, recipeController.updateRecipe);
router.patch('/commentsAndRatings/:id',authentication, recipeController.addCommentsAndRatings);
router.delete('/recipes/:id',authentication, recipeController.deleteRecipe);


module.exports = router;