const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Notification {
        _id: ID
        senderId: User
        recipientId: User
        sentAt: String
        isRead: Boolean
        isActivated: Boolean
        type: Int
    }
    type User {
        _id: ID
        username: String
        email: String
        password: String
        isActive: String
        activeSessionId: String
    }
    type Auth {
        token: ID!
        user: User
    }
    type ActiveSession {
        _id: ID
        startedBy: String
        startedAt: String
        players: [User]
    }
    type Query {
        me: User
        users: [User]
        user(username: String!): User
        activeSession(id: ID!): ActiveSession
        myNotifications: [Notification]
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addSession(players: [ID]!): ActiveSession
        endSession(sessionId: String!): ActiveSession
    }
`;

module.exports = typeDefs;