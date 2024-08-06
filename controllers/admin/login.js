const Admin = require('../../models/admin')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const adminLogin = async(req, res)=>{
    const { companyEmail, password } = req.body;
    const user = await Admin.findOne({companyEmail})
    if(!user){
        return res.json({message: "user is not registered"})
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword){
        return res.json({message: "password is incorrect"})
    }
    const token = jwt.sign({companyEmail: user.companyEmail}, process.env.TOKEN_KEY, {expiresIn: "24h"})
    res.cookie('token', token, {httpOnly:true ,maxAge: 360000})
    return res.json({status:true, message: "login successfully"})
}

module.exports = adminLogin