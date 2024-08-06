const Fellow = require("../../models/fellow")
const _ = require('lodash');
const bcrypt = require('bcrypt')


const updatePassword = async(req, res)=>{

    const {email, password, confirmPassword} = req.body;

    const userExists = await Fellow.findOne({email: email});
    if(!userExists) return res.status(400).json({
        success: false,
        message: 'User does not exist'
    });


    try {

        if(_.isEqual(password, confirmPassword)){
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            await userExists.updateOne({id: userExists.id}).set({
               password: hash
            });
           

        }else{
            return res.status(400).json({
                success: false,
                message: 'Passwords do not match'
            })
        };

        return res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        });
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong - update password'
        })
    }


};


module.exports = updatePassword