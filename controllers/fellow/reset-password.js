const Fellow = require("../../models/fellow");
const generateToken = require('../../utils/generate-token');
const { sendEmail } = require('../../utils/send-email');

const resetPassword = async (req, res) => {
    const { email } = req.body;

    const userExists = await Fellow.findOne({ email: email });
    if (!userExists) {
        return res.status(400).json({
            success: false,
            message: `User with email ${email} does not exist`
        });
    }

    try {
        // Generate OTP token
        const { token, expiresAt } = await generateToken(10);
        console.log(`Generated Token: ${token}`);

        // Send OTP token via email
        const emailSent = await sendEmail(token, email);
        if (!emailSent) {
            console.log(`Reset-token OTP email failed to ${email}`);
            return res.status(500).json({
                success: false,
                message: 'Failed to send reset-password email'
            });
        }

        // Update user with verification token and TTL
        userExists.verificationToken = token;
        userExists.verificationTokenTTL = expiresAt;
        await userExists.save();

        return res.status(200).json({
            success: true,
            message: `Reset-password email sent to ${email} successfully`
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong - reset password'
        });
    }
};

module.exports = resetPassword;
