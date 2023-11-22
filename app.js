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
  patchVotesByArticleId,
} = require("./controllers/articles.controller");

const { handleCustomErrors, handlePsqlErrors } = require("./errors");
const { deleteCommentByCommentId } = require("./controllers/comments.controller");
const { getUsers } = require("./controllers/user.controller");
const app = express();
app.use(express.json());

app.get("/api/healthcheck", getHealthcheck);
app.get("/api", getApi);

//topics endpoints
app.get("/api/topics", getTopics);

//articles endpoints
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticle);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
app.post("/api/articles/:article_id/comments", postCommentByArticleId);
app.patch("/api/articles/:article_id", patchVotesByArticleId);

//comments endpoints
app.delete("/api/comments/:comment_id", deleteCommentByCommentId)

//user endpoints
app.get('/api/users', getUsers)

//error handling middleware
app.use(handlePsqlErrors);
app.use(handleCustomErrors);

module.exports = app;
