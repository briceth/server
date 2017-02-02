//main starting point of the application

// I - require all dependencies
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express(); // II - we create an instance of express which is our app
const router = require('./router');

//app setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);



//server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);// III - create a server which can accept http request and implement the instance of app
server.listen(port); // IV - listen the port we just declared
console.log('serveur listening on:', port);
