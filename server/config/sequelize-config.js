const path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'uprise-test'
    },
    port: 5432,
    db: {
      database: "uprise-test",
      user: "samuelwemyss",
      password: "",
      options: {
        host: 'localhost',
        dialect: 'postgres',

        pool: {
          max: 100,
          min: 0,
          idle: 10000
        }
      }
    }
  }
}

module.exports = config[env];
