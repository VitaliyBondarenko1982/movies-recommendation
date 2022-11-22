const express = require('express');
const http = require('http');
const path = require('path');





const app = express();
const httpServer = http.createServer(app);

const BUILD_PATH = [ '../client', 'build' ];

if (process.env.NODE_ENV !== 'development') {
  app.use(express.static( path.join(__dirname, ...BUILD_PATH)));
  app.use(express.static('public'))

  app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, ...BUILD_PATH, 'index.html'))
  })
}

httpServer.listen({ port: 4001 }, () => {
  console.log(`🚀 Server ready at PORT: ${PORT}`);
})

module.exports = app;


