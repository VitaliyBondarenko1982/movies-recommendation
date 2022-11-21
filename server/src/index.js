const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const { ApolloServer } = require('apollo-server-express');
const {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault
} = require('apollo-server-core');



const Query = require('./resolvers/Query');

const resolvers = {
  Query
}

const typeDefs = fs.readFileSync(
  path.join(__dirname, 'schema.graphql'),
  'utf8'
);

const context = ({ req, res }) => ({
  locale: req?.headers?.locale || 'en-US'
})

// TODO update to v.4 apollo-server
async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ ended: true })
    ],
  });

  await server.start();
  server.applyMiddleware({ app });

  const BUILD_PATH = [ '../../client', 'build' ]

  app.use(express.static( path.join(__dirname, ...BUILD_PATH)));
  app.use(express.static('public'))

  app.get('/rest', (req, res) => {
    res.json({ data: 'rest works'})
  })

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, ...BUILD_PATH, 'index.html'))
  })

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
