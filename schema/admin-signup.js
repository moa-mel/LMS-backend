const Joi = require('joi');

const adminSignupSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    //validation checks the presence of @, domain after @ and .com
    companyEmail: Joi.string().email().required(),
    companyRole: Joi.string().valid(
        'CTO',
        'Operation Manager',
        'CEO'
    ).required(),
})

module.exports = adminSignupSchema;