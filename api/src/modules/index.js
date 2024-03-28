const merge = require('lodash.merge');
const { gql } = require('apollo-server-express');

const userModule = require('./user');
const sessionModule = require('./activeSession');
const notificationModule = require('./notification');

module.exports = {
  typeDefs: gql([
    ...userModule.typeDefs,
    ...sessionModule.typeDefs,
    ...notificationModule.typeDefs,
  ].join('')),
  resolvers: merge(
    userModule.resolvers,
    sessionModule.resolvers,
    notificationModule.resolvers,
  ),
};