const Admin = require('../../models/admin');
const adminSignupSchema = require("../../schema/admin-signup");
const { generatePasswordCreationToken, sendPasswordCreationEmail } = require('../../utils/send-email');


const adminRegister = async (req, res) => {
    try {
        const { firstName, lastName, companyEmail, companyRole } = req.body;

        // Validation
        const { error } = adminSignupSchema.validate({ firstName, lastName, companyEmail, companyRole});
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const user = new Admin({
            firstName,
            lastName,
            companyEmail,
            companyRole
        });

        await user.save();

        const token = generatePasswordCreationToken(user.companyEmail);
        sendPasswordCreationEmail(user.companyEmail, token);

        return res.status(200).json({ status: true, message: "Registration completed, check your email to create password" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = adminRegister;