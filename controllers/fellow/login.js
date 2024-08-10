const Fellow = require('../../models/fellow')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const fellowLogin = async(req, res)=>{
    const { email, password } = req.body;
    const user = await Fellow.findOne({email})
    if(!user){
        return res.json({message: "user is not registered"})
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword){
        return res.json({message: "password is incorrect"})
    }
    const token = jwt.sign({email: user.email}, process.env.TOKEN_KEY, {expiresIn: "24h"})
    res.cookie('token', token, {httpOnly:true ,maxAge: 360000})
    return res.json({status:true, message: "login successfully", token})
}

module.exports = fellowLogin