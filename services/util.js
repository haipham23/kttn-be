const Isemail = require('isemail');

const parseWrapper = async (func, res) => {
  try {
    const result = await func();

    return res.send(result);
  } catch (e) {
    return res.status(400).send(e);
  }
};

const isEmail = email => email && Isemail.validate(email);
const isPasswordValid = password => typeof password === 'string' && password.length >= 6;

module.exports = {
  parseWrapper,
  isEmail,
  isPasswordValid
};
