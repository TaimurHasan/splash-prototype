const activeSession = require('./queries/activeSession');

const addSession = require('./mutations/addSession');
const endSession = require('./mutations/endSession');

module.exports = {
  Query: {
    activeSession,
  },
  Mutation: {
    addSession,
    endSession,
  },
};