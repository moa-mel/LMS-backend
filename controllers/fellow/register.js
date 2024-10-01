const Fellow = require('../../models/fellow');
const signUpSchema = require("../../schema/register");
const { generatePasswordCreationToken, sendPasswordCreationEmail } = require('../../utils/send-email');
const upload = require('../../utils/uploadFile');
const cloudinary = require('../../utils/cloudinary');


const fellowRegister = async (req, res) => {
    try {

        const { firstName, lastName, email, role,portfolio, linkedIn, github, dribble, behance } = await req.body;
        const file = await req.file;
        console.log(File)

        const response = await cloudinary.uploader.upload(file.path, {folder: "LMS", resource_type: 'raw'})
        // // Validation
        console.log(response)
        const fellowCV = response.secure_url
        const { error } = signUpSchema.validate({ firstName, lastName, email, fellowCV, role, portfolio, linkedIn, github, dribble, behance });
        if (error) {
            return res.status(400).json({ 'message': error.details[0].message });
          
        }


        const user = await new Fellow({
            firstName,
            lastName,
            email,
            role,
            fellowCV,
            portfolio,
            linkedIn,
            github,
            dribble,
            behance
        });

        // // await user.save();
        await Fellow.create(user)
        .then(()=>{
            const token = generatePasswordCreationToken(user.email);
            sendPasswordCreationEmail(user.email, token);

            return res.status(200).json({ status: true, message: "Registration completed, check your email to create password" });
        })
        .catch(err=>{
            throw (err)
        })
// 
     } catch (error) {
        // This is to Check if the email in entered has been registered
        if(error.message.includes("E11000 duplicate key")){
            return res.status(400).json({ 'message': "Email already exists" });
        }

        return res.status(500).json({ 'message': error.message });
    }
}

module.exports = { fellowRegister, upload };