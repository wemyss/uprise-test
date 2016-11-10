'use strict';

const models = require('../models/index');
const Sequelize = require('sequelize');

module.exports = function() {
  return [{
    method: 'GET',
    path: '/coaches',
    handler(request, reply) {
      models.Coach.findAll({
          attributes: ['id', 'name', 'email', 'active']
        })
        .then((users) => {
          reply(users);
        });
    }
  }, {
    method: 'POST',
    path: '/coaches/removeAll',
    handler(request, reply) {
      models.Coach.destroy({
        where: {}
      }).then(() => {
        reply('Removed all coaches!');
      });
    }
  }, {
    method: 'POST',
    path: '/coaches/addOne',
    handler(request, reply) {
      models.Coach.create({
          name: request.payload.name,
          email: request.payload.email,
          active: true
        })
        .then((user) => {
          reply('added coach ' + user.name);
        });

    }
  }, {
    method: 'POST',
    path: '/coaches/{_id}/remove',
    handler(request, reply) {
      models.Coach.destroy({
        where: {
          id: _id
        }
      });
    }
  }, {
    method: 'POST',
    path: '/coaches/{_id}/update',
    handler(request, reply) {
      models.Coach
        .update({
          name: request.payload.name,
          email: request.payload.email,
          active: request.payload.active
        }, {
          id: _id
        }).then((rowsAffected) => {
          console.log('updated ' + rowsAffected[0] + 'rows');
        });
    }
  }];
}();
