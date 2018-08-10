// Module dependencies
import * as path from 'path';
import app from './app';
import wds from './wds';

// Cheack whether servier is running in development or production mode
app.set('env', process.env.NODE_ENV ? process.env.NODE_ENV : 'development');

wds(app);

const PORT = process.env.PORT || 3000;

// Send React application
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
})

const http = require('http').Server(app);

import SocketsController from './modules/sockets/sockets.controller';
const sockets = new SocketsController(http);

// Start server
http.listen(PORT, () => console.log('Running on localhost:', PORT));


