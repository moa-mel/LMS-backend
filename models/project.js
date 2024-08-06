const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    talentAssign:{
        type: String,
        enum: [
            'product design',
            'product management',
            'front-end development',
            'back-end development',
            'data analysis',
        ]
    },
    startDate:{
        type: Date
    },
    dueDate: {
        type: Date
    },
    milestoneTitle:{
        type: String
    },
    description:{
        type: String
    }

})

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;