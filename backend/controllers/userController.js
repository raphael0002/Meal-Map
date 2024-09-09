const eah = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateAndSendToken');

const createUser = eah(async (req, res)=> {
    const {username, email, password, confirmPassword} = req.body;

    const createUser = await User.create({
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword
    });

    generateToken(createUser,"user", 200, res);
})

const loginUser = eah(async (req, res)=> {
    const {email, password} = req.body;
    if(!email && !password){
        throw new Error('Invalid email or password');
    }

    const user = await User.findOne({email}).select('+password');
    const correct = await user.comparePassword(password.value, user.password);

    if(!user || !correct){
        throw new Error('Invalid email or password');
    }

    generateToken(user,"user", 200, res);
});

const deleteUser = eah(async(req, res) => {
    const id = req.user.id;
    await User.findByIdAndDelete(id);
    res.status(204).json({
        status:'success',
        data: null
    });
});

const updateUser = eah(async (req, res) => {
    const id = req.user.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'email', 'password', 'confirmPassword','bio', 'profilePicture'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).json({
            error: 'Invalid updates'
        });
    }
    
    const user = await User.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});

    if(user){
        res.status(200).json({
            status:'success',
            data: user
        });
    }else{
        res.status(404).json({
            status:'fail',
            message: 'User not found'
        });
    }

});


const addIngredientToShoppingList = eah(async (req, res) => {
    const { ingredients} = req.body;
    let ingredientData = [{}];
    ingredients.map((ingredient) => ingredientData.push({name: ingredient.name, quantity: ingredient.quantity}))
    const user = await User.findByIdAndUpdate(req.user.id, {
        $push: { shoppingList: {ingredient:ingredientData} }
    },{new: true});

    if(!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found'
        });
    }

    res.status(200).json({
        status: 'success',
        data: user.shoppingList
        
    });
});


const getShoppingList = eah(async (req, res) => {
    const user = await User.findById(req.user.id).select('shoppingList');

    if(!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found'
        });
    }

    res.status(200).json({
        status: 'success',
        data: user.shoppingList
    });
});


const updateShoppingList = eah(async (req, res) => {
    const { ingredient, quantity, unit } = req.body;
    const user = await User.findById(req.user.id);

    if(!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found'
        });
    }

    const item = user.shoppingList.id(req.params.itemId);
    if(item) {
        item.ingredient = ingredient;
        item.quantity = quantity;
        item.unit = unit;
        await user.save();
    } else {
        return res.status(404).json({
            status: 'fail',
            message: 'Ingredient not found'
        });
    }

    res.status(200).json({
        status: 'success',
        data: user.shoppingList
    });
});

const deleteShoppingListItem = eah(async (req, res) => {
    console.log(req.params.ingredientId);
    const user = await User.findByIdAndUpdate(req.user.id, {
        $pull: { shoppingList: { _id: req.params.ingredientId } }
    }, { new: true });

    if(!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found'
        });
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});

const planMeal = eah(async (req, res) => {
    const { recipeId, plannedFor } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id,{
          $push: {
            planner:{ recipe: recipeId, plannedFor }
         }  
    },{new:true,runValidators: true});

    if(!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found'
        });
    }

    // user.planner.push({ recipe: recipeId, plannedFor });
    // await user.save();

    res.status(200).json({
        status: 'success',
        data: user.planner
    });
});

const getPlanner = eah(async (req, res) => {
    const user = await User.findById(req.user.id).populate('planner.recipe');

    if(!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found'
        });
    }

    res.status(200).json({
        status: 'success',
        data: user.planner
    });
});

const deletePlanner = async (req, res)=>{
    console.log(req.params.plannerId);
    const user = await  User.findByIdAndUpdate(req.user.id,{
        $pull: { planner: { _id: req.params.plannerId } }
    },{new:true});
    if(!user) {
        res.status(404).json({
            status: 'fail',
            message: 'User not found'
        });
    };

    res.status(204).json({
        status:'success',
        data: null
    });
}

const getUserData = eah(async (req, res) => {
    const id = req.user.id;
    const user = await User.findById(id);
    if(user){
        res.status(200).json({
            status:'success',
            data: user
        })
    }
})



module.exports = {
    createUser,
    loginUser,
    deleteUser,
    updateUser,
    addIngredientToShoppingList,
    getShoppingList,
    updateShoppingList,
    planMeal,
    getPlanner,
    getUserData,
    deletePlanner,
    deleteShoppingListItem
}