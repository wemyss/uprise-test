'use strict';

const Hapi = require('hapi');
const models = require('./models');
const routes = require('./routes');


// create the server
const server = new Hapi.Server();
server.connection({
  port: 3000
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
        path: '../dist'
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
  });
});
