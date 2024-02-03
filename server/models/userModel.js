const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    name:String,
    password:String,
    role:{
      type:String, default:"user"
    }

  },{timestamps:true})


exports.UserModel = mongoose.model("users", userSchema);

exports.userValidation = (_reqbody) =>{
    const joiSchema = joi.object({
        name:joi.string().min(1).max(100).required(),
        password:joi.string().min(3).max(16).required()

    })
    return joiSchema.validate(_reqbody);
}


exports.loginValidation = (_reqbody) =>{
    const joiSchema = joi.object({
        name:joi.string().min(3).max(150).required(),
        password:joi.string().min(3).max(16).required()

    })
    return joiSchema.validate(_reqbody);
}


exports.createToken = (_id, role) =>{
    const token = jwt.sign({_id, role},process.env.TokenSecret, {expiresIn:"600mins"});
    return token;
}


