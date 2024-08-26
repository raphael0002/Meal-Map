const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Cook = require("../models/cookModel")
const User = require("../models/userModel")
const auth = require("../middlewares/authenticationMiddleware")

router.post("/",auth,async(req,res)=>{
    const valueIfCook = await Cook.findOne({email:req.body.email})
    if(valueIfCook && valueIfCook.id===req.user.id && req.user.role === req.body.role){
        return res.json({success:true})
    }
    const valueIfUser = await User.findOne({email:req.body.email})
    if(valueIfUser && valueIfUser.id===req.user.id && req.user.role === req.body.role){

        return res.json({success:true})
    }

    return res.json({success:true})
})
module.exports=router