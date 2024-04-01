const types = require('./types.gql');

module.exports = [`
    extend type Query {
        myNotifications: [Notification]
    }
    extend type Mutation {
        markNotificationsAsRead(unreadNotifications: [ID]!): [Notification]
    }
`, types];