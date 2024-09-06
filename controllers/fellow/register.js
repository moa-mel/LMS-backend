const Fellow = require('../../models/fellow');
const signUpSchema = require('../../schema/register');
const { generatePasswordCreationToken, sendPasswordCreationEmail } = require('../../utils/send-email');
const uploadImage = require('../../utils/uploadImage');

const fellowRegister = async (req, res) => {
    // Access the form data fields
    const { firstName, lastName, email, role, portfolio, linkedIn, github, dribble, behance } = req.body;

    try {
        // Validate input
        const { error } = signUpSchema.validate({ firstName, lastName, email, role, portfolio, linkedIn, github, dribble, behance });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Handle the file if uploaded
        let fellowCV;
        if (req.file && req.file.path) {
            try {
                const uploadImageSuccess = await uploadImage(req.file.path);
                if (!uploadImageSuccess) {
                    console.log('Something went wrong - image upload');
                    return res.status(500).json({ message: 'Image upload failed' });
                }
                fellowCV = uploadImageSuccess.public_id;
            } catch (error) {
                console.log(error.message);
                return res.status(500).json({ message: 'Image upload failed' });
            }
        }

        // Create new Fellow instance and save to DB
        const user = new Fellow({
            firstName,
            lastName,
            email,
            role,
            fellowCV,
            portfolio,
            linkedIn,
            github,
            dribble,
            behance,
        });

        await user.save();

        // Generate token and send email
        const token = generatePasswordCreationToken(user.email);
        sendPasswordCreationEmail(user.email, token);

        return res.status(200).json({ status: true, message: 'Registration completed, check your email to create a password', token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { fellowRegister };