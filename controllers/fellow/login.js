const Fellow = require('../../models/fellow')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const fellowLogin = async(req, res)=>{
    const { email, password } = req.body;
    try {
        // Check if user exists
        const user = await Fellow.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User is not registered" });
        }

        // Check if password is valid
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Password is incorrect" });
        }

        // Generate JWT token
        const token = jwt.sign({ email: user.email }, process.env.TOKEN_KEY, { expiresIn: "24h" });

        // Set token in cookie
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // maxAge should be in milliseconds (1 hour)

        return res.status(200).json({ status: true, message: "Login successfully", token });
    } catch (error) {
        console.error("Login error: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = fellowLogin