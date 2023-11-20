const express = require("express");
const {
  getTopics,
  getHealthcheck,
} = require("./controllers/topics.controller");
const { getApi } = require("./controllers/api.controller");
const app = express();
app.use(express.json());

app.get("/api/healthcheck", getHealthcheck);
app.get("/api", getApi);
app.get("/api/topics", getTopics);

module.exports = app;
