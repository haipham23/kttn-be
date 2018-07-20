const packageJson = require('../package.json');

const health = (req, res, next) => res.send(`version: ${packageJson.version}`);

module.exports = health;
