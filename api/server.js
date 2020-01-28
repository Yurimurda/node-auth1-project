const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');


const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

const sessionConfig = {
    name: 'test',
    secret: 'you want the gookie gookie?',
    cookie: {
        maxAge: 1000 * 30,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
};


server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig))
server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'Behold!' });
});

module.exports = server;