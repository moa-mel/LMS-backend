const Fellow = require("../../models/fellow");

const resetToken = async (req, res) => {
    const { email, token } = req.body;

    try {
        console.log(`Looking for user with email: ${email} and token: ${token}`);
        
        const userExists = await Fellow.findOne({ email, verificationToken: token });
        if (!userExists) {
            console.log('User not found or token invalid');
            return res.status(400).json({
                success: false,
                message: 'Token invalid'
            });
        }

        console.log(`Token expiry time: ${userExists.verificationTokenTTL}`);
        if (new Date(userExists.verificationTokenTTL) <= new Date()) {
            console.log(`Token expired for user: ${email}`);
            return res.status(400).json({
                success: false,
                message: `OTP provided expired for ${userExists.email}`
            });
        }

        // Clear the verification token and its TTL
        userExists.verificationToken = '';
        userExists.verificationTokenTTL = null;
        await userExists.save();

        console.log('Token confirmed successfully');
        return res.status(200).json({
            success: true,
            message: 'Token confirmed successfully'
        });
    } catch (error) {
        console.error('Error occurred:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong - update password'
        });
    }
};

module.exports = resetToken;
