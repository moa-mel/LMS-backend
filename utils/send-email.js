const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Verifying the transporter configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('Error with nodemailer transporter:', error);
    } else {
        console.log('Nodemailer transporter is ready');
    }
});

const generatePasswordCreationToken = (email) => {
    return jwt.sign({ email }, process.env.TOKEN_KEY, { expiresIn: '4h' });
};

const sendPasswordCreationEmail = (email, token) => {
    const passwordCreationLink = `http://localhost:3000/create-password?token=${token}`;

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Create Your Password',
        html: `<div>
            <p>Welcome</p>
            <a href="${passwordCreationLink}">Click here to create your password</a>
        </div>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

const sendEmail = async (token, to) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: 'Your Password Reset OTP',
        text: `Your OTP token is ${token}`
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error(`Error sending email: ${error.message}`);
        return false;
    }
};

module.exports = {
    generatePasswordCreationToken,
    sendPasswordCreationEmail,
    sendEmail
};
