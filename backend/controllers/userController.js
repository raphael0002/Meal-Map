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

    generateToken(createUser, 200, res);
})

const loginUser = eah(async (req, res)=> {
    const {email, password} = req.body;
    if(!email && !password){
        throw new Error('Invalid email or password');
    }

    const user = await User.findOne({email}).select('+password');
    const correct = await user.comparePassword(password, user.password);

    if(!user || !correct){
        throw new Error('Invalid email or password');
    }

    generateToken(user, 200, res);
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

module.exports = {
    createUser,
    loginUser,
    deleteUser,
    updateUser
}