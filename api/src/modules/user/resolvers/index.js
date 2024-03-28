const me = require('./queries/me');
const users = require('./queries/users');

const login = require('./mutations/login');
const addUser = require('./mutations/addUser');

module.exports = {
  Query: {
    me,
    users,
  },
  Mutation: {
    login,
    addUser,
  }
};