const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        isActive: String
    }
    type Auth {
        token: ID!
        user: User
    }
    type Session {
        _id: ID
        startedBy: String
        startedAt: String
        players: [User]
    }
    type Query {
        me: User
        users: [User]
        user(username: String!): User
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addSession(username: String!): Session
        endSession(username: String!): Session
    }
`;

module.exports = typeDefs;