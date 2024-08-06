const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
     
    companyEmail: {
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
    companyRole: {
        type: String,
        required: true,
        enum: [
            'CTO',
            'Operation Manager',
            'CEO',
        ]
    },
    verificationToken: {
        type: String,
    },
    verificationTokenTTL: {
        type: Date,
    },
    
},
{
    timestamps: true
}
);



const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
