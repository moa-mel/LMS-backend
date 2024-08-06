const Fellow = require("../../models/fellow");

const saveAssessment = async (req, res) => {
    const { type, result } = req.body;
    const email = req.email;

    // Validate type and result
    const validTypes = ['generalTest', 'skillTest', 'interview'];
    const validResults = ['pass', 'fail'];

    if (!validTypes.includes(type) || !validResults.includes(result)) {
        return res.status(400).json({ message: 'Invalid type or result' });
    }

    try {
        // Find the user by email
        const user = await Fellow.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user fields based on the type and result
        if (type === 'generalTest') {
            user.completeGeneralTest = true;
            user.generalTestFailed = result === 'fail';
        }

        if (type === 'skillTest') {
            user.completeSkillTest = true;
            user.skillTestFailed = result === 'fail';
        }

        if (type === 'interview') {
            user.completeInterview = true;
            user.interviewFailed = result === 'fail';
        }

        // Save the updated user
        await user.save();

        res.status(200).json({ message: 'User assessment state updated', user });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const getAssessment = async (req, res) => {
    const email = req.email;

    try {
        // Find the user by email
        const user = await Fellow.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Respond with the user's assessment progress
        res.status(200).json({
            completeGeneralTest: user.completeGeneralTest,
            generalTestFailed: user.generalTestFailed,
            completeSkillTest: user.completeSkillTest,
            skillTestFailed: user.skillTestFailed,
            completeInterview: user.completeInterview,
            interviewFailed: user.interviewFailed,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = { saveAssessment, getAssessment };
