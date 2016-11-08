'use strict';

const models = require('../models/index');

module.exports = function() {
  return [{
    method: 'GET',
    path: '/coaches',
    handler: function(request, reply) {
      models.Coach.findAll()
        .then((user) => {

          reply(user);

        });

    }
  }, {
    method: 'GET',
    path: '/coaches/addOneTest',
    handler: function(request, reply) {
      models.Coach.create({name: "sam wemyss"})
        .then((user) => {

          reply('added a coach: ' + user.name);

        });

    }
  }];
}();
