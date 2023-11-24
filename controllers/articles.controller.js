const {
  getArticleByID,
  getAllArticles,
  insertCommentByArticleId,
  updateVotesByArticleId,
} = require("../models/articles.model");
const { checkExists } = require("../db/seeds/utils");

exports.getArticle = (req, res, next) => {
  const { article_id } = req.params;
  getArticleByID(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  const { topic } = req.query;
  const { sort_by } = req.query;
  const { order_by } = req.query;
  const articlesByTopicsPromises = [getAllArticles(topic, sort_by, order_by)];

  if (topic) {
    articlesByTopicsPromises.push(checkExists("topics", "slug", topic));
  }

  Promise.all(articlesByTopicsPromises)
    .then((resolvedPromises) => {
      const articles = resolvedPromises[0];
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const commentsByArticleIdPromises = [fetchCommentsByArticleId(article_id)];

  if (article_id) {
    commentsByArticleIdPromises.push(
      checkExists("articles", "article_id", article_id)
    );
  }

  Promise.all(commentsByArticleIdPromises)
    .then((resolvedPromises) => {
      const comments = resolvedPromises[0];
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  insertCommentByArticleId(article_id, username, body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.patchVotesByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  updateVotesByArticleId(article_id, inc_votes)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};
