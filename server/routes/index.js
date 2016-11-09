'use strict';

const models = require('../models/index');

module.exports = function() {
  return [{
    method: 'GET',
    path: '/coaches',
    handler: function(request, reply) {
      models.Coach.findAll({
          attributes: ['name', 'email']
        })
        .then((users) => {
          reply(users);
        });
    }
  }, {
    method: 'POST',
    path: '/coaches/addOne',
    handler: function(request, reply) {
      models.Coach.create({
          name: request.payload.name,
          email: request.payload.email
        })
        .then((user) => {
          reply('added coach ' + user.name);
        });

    }
  }];
}();
