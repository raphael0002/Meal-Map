const jwt = new require('jsonwebtoken');
const User =require("../models/userModel.js");
const Cook =require("../models/cookModel.js");

const authenticationMiddleware = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        token = req.headers.authorization.split(' ')[1];
    }
    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            currentUser = await User.findById(decoded.id);
            if(currentUser){
                req.user = {id: currentUser._id, role:"user"}
                return next();
            };

            currentCook = await Cook.findById(decoded.id);
            if(currentCook){
                req.user = {id: currentCook._id, role:"cook"}
                return next();
            } 
            
            res.status(401).json({
                message: 'Unauthorized User'
            });
        }catch(error){
            res.status(401).json({
                message: 'Invalid token'
            });
        }
    }else{
        res.status(401).json({
            message: 'No token provided'
        });
    }

};

module.exports = authenticationMiddleware;