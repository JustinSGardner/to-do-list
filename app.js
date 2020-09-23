'use strict'

const http = require('http');

const hostname = '127.0.0.1';
const port = 3333;

const express = require('express');
const es6Renderer = require('express-es6-template-engine');
const morgan = require('morgan');
const logger = morgan('tiny');
const helmet = require('helmet');
const session = require('express-session');
const fileStore = require('session-file-store')(session);
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');

app.engine('html', es6Renderer);
app.set('views', './views');
app.set('view engine', 'html');

// app.use(express.static(path.join(__dirname, 'public')));
app.use(logger);
app.use(helmet());
app.use(cookieParser());
app.use(session({
    secret: 'sweet',
    resave: false,
    saveUninitialized: true,
    is_logged_in: false
})
);
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}`)
});

const rootController = require('./routes/index');
const tasksController = require('./routes/tasks');
const usersController = require('./routes/users');




app.use('/', rootController);
app.use('/tasks', tasksController);
app.use('/users', usersController);