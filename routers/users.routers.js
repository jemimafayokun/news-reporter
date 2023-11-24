const { getUsers } = require('../controllers/user.controller');

const usersRouter = require('express').Router()

usersRouter.get("/", getUsers);

module.exports = usersRouter;