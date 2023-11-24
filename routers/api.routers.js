const { getApi, getHealthcheck } = require("../controllers/api.controller");

const apiRouter = require("express").Router();

apiRouter.get("/healthcheck", getHealthcheck);
apiRouter.get("/", getApi);

module.exports = apiRouter;
