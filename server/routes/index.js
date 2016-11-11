'use strict';

const models = require('../models/index');
const Sequelize = require('sequelize');

module.exports = function() {
  return [{
    method: 'GET',
    path: '/coaches',
    handler(request, reply) {
      models.Coach.findAll({
          attributes: ['id', 'name', 'email', 'active'],
          order: '"createdAt" DESC'
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
        reply(models.Coach.findAll({
          attributes: ['id', 'name', 'email', 'active']
        }));
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
          reply(user);
        });

    }
  }, {
    method: 'POST',
    path: '/coaches/{_id}/remove',
    handler(request, reply) {
      models.Coach.destroy({
        where: {
          id: request.params._id
        }
      }).then(reply('testtestetsetset'));
    }
  }, {
    method: 'POST',
    path: '/coaches/{_id}/update',
    handler(request, reply) {
      let coach = {};

      if (request.payload.name !== undefined) {
        coach.name = request.payload.name;
      }
      if (request.payload.email !== undefined) {
        coach.email = request.payload.email;
      }
      if (request.payload.name !== undefined) {
        coach.active = request.payload.active;
      }

      models.Coach
        .update(coach, {
          where: {
            id: request.params._id
          }
        }).then((rowsAffected) => {
          console.log('updated ' + rowsAffected[0] + 'rows');
          reply('updated yo');
        });
    }
  }];
}();
