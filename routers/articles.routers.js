const {
  getArticles,
  getArticle,
  getCommentsByArticleId,
  postCommentByArticleId,
  patchVotesByArticleId,
  postArticle,
} = require("../controllers/articles.controller");

const articlesRouter = require("express").Router();

articlesRouter.get("/", getArticles);
articlesRouter.get("/:article_id", getArticle);
articlesRouter.get("/:article_id/comments", getCommentsByArticleId);
articlesRouter.post("/", postArticle)
articlesRouter.post("/:article_id/comments", postCommentByArticleId);
articlesRouter.patch("/:article_id", patchVotesByArticleId);

module.exports = articlesRouter;
