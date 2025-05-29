// check env.
let env = process.env.NODE_ENV || 'development';

// fetch env. config
let config = require('./config.json');
let envConfig = config[env];

// add env. config values to process.env
Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);