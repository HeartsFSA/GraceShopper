// Required IMPORTS
const express = require('express');
const server = express();
const morgan = require('morgan');
const path = require('path');
const apiRouter = require('./server/api');
const {client} = require('./server/db');
const {PORT = 4000} = process.env; // server port

// connect the database client
client.connect();

// body-parser & logging middleware
server.use(express.json());
server.use(morgan('tiny'));

// express static for build files
server.use('/', express.static(path.join(__dirname, 'build')));

server.use('/api', apiRouter);

// Error Handler
server.use('/', (err, req, res, next) => {
  console.log(`ERROR: ${err.name} (${err.message})`);
  // let status = err.status || 500;

  res.send({error: err});
});

// For any get routes that are not in /api, rely on ReactRouter to handle
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.js'));
});

// 404 Handler
server.use('*', (req, res) => {
  res.status(404).send('Invalid Request.  Try again.');
});

server.listen(PORT, () => console.log(`Starting server on port: ${PORT}`));
