const myNotifications = require('./queries/myNotifications');

const markNotificationsAsRead = require('./mutations/markNotificationsAsRead');

module.exports = {
  Query: {
    myNotifications,
  },
  Mutation: {
    markNotificationsAsRead,
  },
};