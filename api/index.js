const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { authMiddleware } = require('./utils/auth');

const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
})

const app = express();
const port = process.env.PORT || 8000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require('./config/connection');
const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });
    db.once('open', () => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
};

startApolloServer(typeDefs, resolvers);
