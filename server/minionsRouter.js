const express = require('express');
const minionsRouter = express.Router();
const worksRouter = express.Router({mergeParams: true})

module.exports = {minionsRouter, worksRouter};

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');



// Create minionId parameter 
minionsRouter.param('minionId', (req, res, next, id) => {
    const minions = getFromDatabaseById('minions', id)
    if(minions){
        req.minions = minions;
        next();
    } else {
        res.status(404).send();
    }
});

minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minions);
});

minionsRouter.put('/:minionId', (req, res, next) => {
    const updateMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updateMinion);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const deleteMinion = deleteFromDatabasebyId('minions', req.params.minionId);
    if(deleteMinion){
        res.status(204);
        
    } else {
        res.status(500);
    }
    res.send();
});



worksRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    if(work){
        req.work = work;
        next();
    } else {
        res.status(404).send();
    }
});

worksRouter.get('/', (req, res, next) => {
    const work = getAllFromDatabase('work').filter(workLoad => {
        return workLoad.id === req.params.minionId;
    });
    res.send(work);
});

worksRouter.post('/', (req, res, next) => {
    const newWork = addToDatabase('work', req.body);
    res.status(201).send(newWork);
});

worksRouter.put('/:workId', (req, res, next) => {
    if(req.body.minionId === req.params.minionId){
        const updateWork = updateInstanceInDatabase('work', req.body);
        res.send(updateWork);
    } else {
        res.status(400).send()
    }
    
});

worksRouter.delete('/:workId', (req, res, next) => {
    const deletedWork = deleteFromDatabasebyId('work', req.params.workId);
    if(deletedWork){
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
});