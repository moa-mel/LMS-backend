const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fellowSchema = new Schema({
     
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        /*required: true*/
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: [
            'product design',
            'product management',
            'front-end development',
            'back-end development',
            'web3 technology',
            'data science',
            'scrum master',
            'devops',
            'quality assurance'
        ]
    },
    fellowCV: {
        type: String,
        // required: true
    },
    portfolio: {
        type: String,
        required: true
    },
    linkedIn: {
        type: String,
        required: true
    },
    github: {
        type: String,
    },
    dribble: {
        type: String,
    },
    behance: {
        type: String,
    },
    verificationToken: {
        type: String,
    },
    verificationTokenTTL: {
        type: Date,
    },
    completeGeneralTest: {
        type: Boolean,
        default: true
    },
    completeSkillTest: {
        type: Boolean,
        default: true
    },
    completeInterview: {
        type: Boolean,
        default: true
    },
    generalTestFailed:{
        type: Boolean,
        default: true
    },
    skillTestFailed:{
        type: Boolean,
        default: true
    },
    interviewFailed:{
        type: Boolean,
        default: true
    },
});

fellowSchema.methods.generateToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.TOKEN_KEY, { expiresIn: '7d' });
    return token;
};

const Fellow = mongoose.model("Fellow", fellowSchema);
module.exports = Fellow;
