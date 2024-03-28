const types = require('./types.gql');

module.exports = [`
    extend type Query {
        me: User
        users: [User]
        user(username: String!): User
    }

    extend type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
    }
`, types];