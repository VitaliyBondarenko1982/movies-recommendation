const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const { ApolloServer } = require('apollo-server-express');
const {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault
} = require('apollo-server-core');



const Query = require('./src/resolvers/Query');

const resolvers = {
  Query
}

const typeDefs = fs.readFileSync(
  path.join(__dirname, 'src', 'schema.graphql'),
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

  const BUILD_PATH = [ 'client', 'build' ];
  const PORT = process.env.PORT || 4000;

  if (process.env.NODE_ENV !== 'development') {
    app.use(express.static( path.join(__dirname, ...BUILD_PATH)));
    app.use(express.static('public'))

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, ...BUILD_PATH, 'index.html'))
    })
  }

  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  await console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
