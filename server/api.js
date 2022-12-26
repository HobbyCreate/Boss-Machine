const express = require('express');
const apiRouter = express.Router();
const {minionsRouter, worksRouter} = require('./minionsRouter');
const ideasRouter = require('./ideasRouter');
const meetingsRouter = require('./meetingsRouter');



apiRouter.use('/minions', minionsRouter);
minionsRouter.use('/:minionId/work', worksRouter);
apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;
