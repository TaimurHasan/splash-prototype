const types = require('./types.gql');

module.exports = [`
    extend type Query {
        activeSession(id: ID!): ActiveSession
    }

    extend type Mutation {
        addSession(players: [ID]!): ActiveSession
        endSession(sessionId: String!): ActiveSession
    }
`, types];