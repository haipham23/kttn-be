const Parse = require('parse/node');
// const axios = require('axios');

// const config = require('../config.json');

const { parseWrapper, isEmail, isPasswordValid } = require('../services/util');

const getSessionByQuery = async (sessionToken) => {
  const query = new Parse.Query(Parse.Session);
  query.equalTo('sessionToken', req.body.sessionToken);

  const result = await query.first({ useMasterKey: true });
  const user = query.get('user');

  return user;
};

const getAdminRole = async () => {
  const query = new Parse.Query(Parse.Role);
  query.equalTo('name', 'Admin');

  const role = await query.first({ useMasterKey: true });

  return role;
};

const create = async (req, res) => {
  const { email, password } = req.body;

  parseWrapper(async () => {
    if (!isEmail(email) || !isPasswordValid(password)) {
      return Promise.reject({
        code: 101,
        message: 'Invalid username/password.'
      });
    }

    const user = new Parse.User();

    const result = await user.signUp({
      username: email,
      email,
      password,
    });

    return result;
  }, res);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  parseWrapper(async () => {
    if (!isEmail(email) || !isPasswordValid(password)) {
      return Promise.reject({
        code: 101,
        message: 'Invalid username/password.'
      });
    }

    const result = await Parse.User.logIn(email, password);
    const sessionToken = result.get('sessionToken');

    return sessionToken;
  }, res);
};

const setAdmin = async (req, res) => {
  parseWrapper(async () => {
    const user = await getSessionByQuery(req.body.sessionToken);
    const adminRole = await getAdminRole();

    adminRole.getUsers().add(user);

    const result = await adminRole.save(null, { useMasterKey: true });

    return result;
  }, res);
};

const reset = async (req, res, next) => {
  const { email } = req.body;

  parseWrapper(async () => {
    await Parse.User.requestPasswordReset(email);

    return 'ok';
  }, res);
};

module.exports = {
  create,
  setAdmin,
  login,
  reset
};
