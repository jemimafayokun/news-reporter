const express = require("express");
const {
  getTopics,
  getHealthcheck,
} = require("./controllers/topics.controller");
const { getApi } = require("./controllers/api.controller");

const {
  getArticle,
  getArticles,
  postCommentByArticleId,
  getCommentsByArticleId,
  incrementVotesByArticleId,
} = require("./controllers/articles.controller");

const { handleCustomErrors, handlePsqlErrors } = require("./errors");
const app = express();
app.use(express.json());

app.get("/api/healthcheck", getHealthcheck);
app.get("/api", getApi);
app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticle);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postCommentByArticleId);
app.patch("/api/articles/:article_id", incrementVotesByArticleId);

app.use(handlePsqlErrors);
app.use(handleCustomErrors);

module.exports = app;
