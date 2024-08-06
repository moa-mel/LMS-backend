const _ = require('lodash');

const generateToken = async function(minute) {
    const token = _.random(100000, 999999);
    const expiresAt = Date.now() + (minute * 60000);

    return { token, expiresAt };
};

module.exports = generateToken;
