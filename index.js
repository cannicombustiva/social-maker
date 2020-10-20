const { ApolloServer } = require('apollo-server');
const mongoose = require ('mongoose');

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const { MONGODB } = require('./config');


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});

//connect to db before we start the server. Actually we need a connection string, we can find it in config.js
mongoose.connect(MONGODB, { useNewUrlParser: true,
                            useUnifiedTopology: true})
    .then(() => {
        console.log('MongoDB connected');
        return server.listen({ port: 5000 })
}).then(res => {
    console.log(`server running at ${res.url}`)
    })
