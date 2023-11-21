const {
  getArticleByID,
  getAllArticles,
  insertCommentByArticleId,
} = require("../models/articles.model");

exports.getArticle = (req, res, next) => {
  const { article_id } = req.params;
  getArticleByID(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  getAllArticles().then((articles) => {
    res.status(200).send({ articles });
  });
};

exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { body } = req.body;
  const { username } = req.body;
  insertCommentByArticleId(article_id, username, body).then((comment) => {
    res.status(200).send({comment})
  })
  .catch(next)
};
