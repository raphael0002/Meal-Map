const eah = require('express-async-handler');
const Cook = require('../models/cookModel');
const generateToken = require('../utils/generateAndSendToken');

const createCook = eah(async (req, res)=> {
    const {username, email, password, confirmPassword} = req.body;

    const createCook = await Cook.create({
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword
    });

    generateToken(createCook, 200, res);
})

const loginCook = eah(async (req, res)=> {
    const {email, password} = req.body;
    if(!email && !password){
        throw new Error('Invalid email or password');
    }

    const cook = await Cook.findOne({email}).select('+password');
    const correct = await cook.comparePassword(password, cook.password);

    if(!cook || !correct){
        throw new Error('Invalid email or password');
    }

    generateToken(cook, 200, res);
});

const deleteCook = eah(async(req, res) => {
    const id = req.user.id;
    await Cook.findByIdAndDelete(id);
    res.status(204).json({
        status:'success',
        message:'Cook deleted successfully',
        data: null
    });
});

const updateCook = eah(async (req, res) => {
    const id = req.user.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'email', 'password', 'confirmPassword','bio', 'profilePicture'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).json({
            error: 'Invalid updates'
        });
    }
    
    const cook = await Cook.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});

    if(cook){
        res.status(200).json({
            status:'success',
            data: cook
        });
    }else{
        res.status(404).json({
            status:'fail',
            message: 'Cook not found'
        });
    }

});

module.exports = {
    createCook,
    loginCook,
    deleteCook,
    updateCook
}