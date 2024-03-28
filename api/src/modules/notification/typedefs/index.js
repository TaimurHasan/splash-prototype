const types = require('./types.gql');

module.exports = [`
    extend type Query {
        myNotifications: [Notification]
    }
`, types];