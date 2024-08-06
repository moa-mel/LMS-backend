const Fellow = require('../../models/fellow');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordSchema = require('../../schema/password');

const createPassword = async (req, res) => {
    try {

        // Extract token from the Authorization header
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(400).json({ message: 'Authorization header is required' });
        }

        const token = authHeader.split(' ')[1]; 
        if (!token) {
            return res.status(400).json({ message: 'Token is required' });
        }

        const {  newPassword, confirmPassword } = req.body;

        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const email = decoded.email;

        const user = await Fellow.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid token or user not found' });
        }

        const { error } = passwordSchema.validate({ password: newPassword, confirmPassword });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = createPassword;
