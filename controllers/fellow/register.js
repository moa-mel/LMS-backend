const Fellow = require('../../models/fellow');
const signUpSchema = require("../../schema/register");
const { generatePasswordCreationToken, sendPasswordCreationEmail } = require('../../utils/send-email');
const upload = require('../../utils/uploadFile');

const fellowRegister = async (req, res) => {
    try {
        const { firstName, lastName, email, role, portfolio, linkedIn, github, dribble, behance } = req.body;
        const fellowCV = req.file ? req.file.path : '';

        // Validation
        const { error } = signUpSchema.validate({ firstName, lastName, email, role, fellowCV, portfolio, linkedIn, github, dribble, behance });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

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
            behance
        });

        await user.save();

        const token = generatePasswordCreationToken(user.email);
        sendPasswordCreationEmail(user.email, token);

        return res.status(200).json({ status: true, message: "Registration completed, check your email to create password" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { fellowRegister, upload };
