'use strict';

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
  },
  production: {
    root: rootPath,
    app: {
      name: 'uprise-test'
    },
    port: 5432,
    db: {
      database: "d39vst2gr09ffs",
      user: "dgnhfyehwqxnvy",
      password: "4PScu-GuznMiAKgUoRrmBAOhMC",
      options: {
        host: 'ec2-54-243-202-84.compute-1.amazonaws.com',
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
