const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');

const complexityOptions = {
    min: 8,
    max: 25,
    lowercase: 1,
    uppercase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4,
};

const passwordSchema = Joi.object({
    password: PasswordComplexity(complexityOptions),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match'
    })
});

module.exports = passwordSchema;
