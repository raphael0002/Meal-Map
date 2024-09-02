const eah = require('express-async-handler');
const Recipe = require('../models/recipeModel')
const Cook = require('../models/cookModel')
const RecipeFeatures = require('../utils/recipeFeatures');

exports.getRecipes = eah( async (req, res) => {
    // Fetch recipes from the database
    const features = new RecipeFeatures(Recipe.find(), req.query).filter().sort().limitFields().paginate();
    const recipes = await features.query;
    
    if(!recipes){
        return res.status(404).json({
            message: 'Recipes not found'})
    }   

    res.status(200).json({
        status: 'success',
        recipe: {
            recipes
        }

    })
});

exports.getRecipeByTitle = eah(async (req, res) => {
    const {title} = req.params;
    const recipe = await Recipe.find({title});

    if(!recipe) {
        return res.status(404).json({
            message: 'Recipe not found'})
    };
    
    res.status(200).json({
        status:'success',
        recipe: {
            recipe
        }
    });
});

exports.getRecipeByCategory = eah(async (req, res) => {
    const category = req.params.category.split(',');
    const recipesByCategory = await Recipe.find({category: {
        $in: category
    }});

    if(!recipesByCategory) {
        return res.status(404).json({
            message: 'Recipe not found'})
    };

    res.status(200).json({
        status:'success',
        recipe: {
            recipesByCategory
        }
    });
});

exports.createRecipe = eah(async (req, res) => {
    if(req.user.role == 'cook'){
        const {title, description, ingredients, steps, calories, prepTime, servable, category, image} = req.body;

        const newRecipe = await Recipe.create({
            title,
            description,
            ingredients,
            steps,
            calories, 
            prepTime, 
            servable,
            category,
            image: image || "https://img-global.cpcdn.com/recipes/aa40df72874ba0f7/1280x1280sq70/photo.webp",
            cook: req.user.id   
        });
        const cook = await Cook.findByIdAndUpdate(
            req.user.id,
            { $push: { myRecipes: newRecipe.id } },
            { new: true }
        );
        if(cook){

            return res.status(201).json({
                status: true,
                message: "Recipe created successfully",
                data:{
                    ...newRecipe
                }            
            });
        };

        throw new Error('Cannot find the cook')
    }
    return res.status(401).json({
        status: false,
        message: "Unauthorized User is not allowed to create reipes"
    })
});

exports.updateRecipe = eah(async (req, res) => {
   if(req.user.role == 'cook'){
    const recipeTitle = req.params.tittle;

    const updateRecipe = await Recipe.findOneAndUpdate({
        title: recipeTitle,
        cook:req.user._id
    }, req.body, {new: true});

    if(updateRecipe){
        return res.status(200).json({
            status: true,
            message: "Recipe updated successfully",
            data: {
                updateRecipe
            }
        });
       }
    throw new Error("Recipe could not be updated");
   }else{
    return res.status(401).json({
        status: false,
        message: "Unauthorized User is not allowed to update reipes"
    });
   };
      
}); 

exports.updateIngredients = eah(async (req, res) => {
    if(req.user.role == 'cook'){
        const recipeTitle = req.params.tittle;
        const updateIngredients = await Recipe.findOneAndUpdate({
            title: recipeTitle,
            cook:req.user._id
        }, req.body, {
            new: true
        });

        if(updateIngredients){
            return res.status(200).json({
                status: true,
                message: "Ingredients updated successfully",
                data: {
                    updateIngredients
                }
            });
        };
        
        throw new Error("Ingredients could not be updated");
    };
    
    return res.status(401).json({
        status: false,
        message: "Unauthorized User is not allowed to update ingredients"
    });
});

exports.deleteRecipe = eah(async (req, res) => {
   if(req.user.role == 'cook'){
        const recipeTitle = req.params.tittle;
        const deleteRecipe = await Recipe.findOneAndDelete({
            title:recipeTitle,
            cook:req.user._id
            });

        if(deleteRecipe){
            return res.status(204).json({
                status: true,
                message: "Recipe deleted successfully"
            });
        };
        
        throw new Error('Cannot delete the recipe')
   }

    return res.status(404).json({
        status: false,
        message: "Unauthorized User is not allowed to delete reipes"
    });
});

exports.addCommentsAndRatings = eah(async (req, res) => {
    const {title} = req.params;
    const comment = req.body.comment || null;
    const rating = req.body.rating || null;
    const commentedAndRated = await Recipe.findOneAndUpdate({
        title
    }, {
        likes: rating,
        $push:{
            comments: {
                user: req.user._id,
                comment
            }
        }
    },{new: true})
    if(commentedAndRated){
        return res.status(200).json({
            status: true,
            message: "Comment and Rating added successfully",
            data: {
                commentedAndRated
            }
        });
    }
    
    throw new Error("Cannot add comments and ratings");
});