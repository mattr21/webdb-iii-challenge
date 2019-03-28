const express = require('express');
const server = express();
const helmet = require('helmet');
const cohortsRouter = require('./routers/cohorts-router.js');
// const studentsRouter = require('./routers/students-router.js');

server.use(express.json());
server.use(helmet());
server.use('/cohorts', cohortsRouter);
// server.use('/students', studentsRouter);

module.exports = server;