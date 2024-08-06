const Joi = require('joi');

const signUpSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    //validation checks the presence of @, domain after @ and .com
    email: Joi.string().email().required(),
    role: Joi.string().valid(
        'product design',
        'product management',
        'front-end development',
        'back-end development',
        'web3 technology',
        'data science',
        'scrum master',
        'devops',
        'quality assurance'
    ).required(),
    fellowCV: Joi.string().required(),
    portfolio: Joi.string().uri().required(),
    linkedIn: Joi.string().uri().required(),
    github: Joi.string().uri().allow(''),
    dribble: Joi.string().uri().allow(''),
    behance: Joi.string().uri().allow('')
})

module.exports = signUpSchema;
