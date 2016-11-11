'use strict';

const Hapi = require('hapi');
const models = require('./models');
const routes = require('./routes');
const Path = require('path');


// create the server
const server = new Hapi.Server();
server.connection({
  port: process.env.PORT || 3000
});

// serve static files under /dist/*
server.register(require('inert'), (err) => {
  if (err) {
    throw err;
  }

  server.route({
    method: 'GET',
    path: '/{file*}',
    handler: {
      directory: {
        path: Path.join(__dirname, '../dist')
      }
    }
  });
});

for (const route in routes) {
  server.route(routes[route]);
}

models.sequelize.sync().then(() => {
  server.start((err) => {
    if (err) {
      console.error(err)
    }
    console.log("Server started at", server.info.uri);
    console.log(__dirname);
  });
});
