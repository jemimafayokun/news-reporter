const express = require("express");
const { getTopics, getHealthcheck } = require("./controllers/topics.controller");
const app = express();

app.get('/api/healthcheck', getHealthcheck)
app.get("/api/topics", getTopics);

module.exports = app;
