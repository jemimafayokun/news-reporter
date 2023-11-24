const express = require("express");

const apiRouter = require("./routers/api.routers");
const topicsRouter = require("./routers/topics.routers");
const articlesRouter = require("./routers/articles.routers");
const commentsRouter = require("./routers/comments.routers");
const usersRouter = require("./routers/users.routers");

const { handleCustomErrors, handlePsqlErrors } = require("./errors");

const app = express();
app.use(express.json());

//routers
app.use("/api", apiRouter);
app.use("/api/topics", topicsRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/users", usersRouter);

//error handling middleware
app.use(handlePsqlErrors);
app.use(handleCustomErrors);

module.exports = app;
