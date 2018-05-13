const Microservice = require('hp-ms-core');
const Parse = require('parse/node');

const routes = require('./routes');
const config = require('./config.json');

Parse.initialize(config.appId, config.jsKey, config.masterKey);
Parse.serverURL = config.appAddress;

const service = new Microservice({ routes, port: 8080 });

service.init();
