const Parse = require('parse/node');
const axios = require('axios');

const config = require('../config.json');

const { parseWrapper } = require('../services/util');

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

const create = async (req, res, next) => {
  const { email, password } = req.body;
  const user = new Parse.User();

  parseWrapper(async () => {
    const result = await user.signUp({
      username: email,
      email,
      password,
    });
  
    return result;
  }, res);
};

const setAdmin = async (req, res, next) => {
  parseWrapper(async () => {
    const user = await getSessionByQuery(req.body.sessionToken);
    const adminRole = await getAdminRole();

    adminRole.getUsers().add(user);

    const result = await adminRole.save(null, { useMasterKey: true });
  
    return result;
  }, res);
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  parseWrapper(async () => {
    const result = await Parse.User.logIn(username, password);
    const sessionToken = result.get('sessionToken');

    return sessionToken;
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