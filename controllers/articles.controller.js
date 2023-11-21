
const {
  getArticleByID,
  getAllArticles,
  insertCommentByArticleId,
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
  getAllArticles().then((articles) => {
    res.status(200).send({ articles });
  });
};

exports.getCommentsByArticleId = (req, res, next) => {
  const {article_id} = req.params
  const commentsByArticleIdPromises = [fetchCommentsByArticleId(article_id)];
  
  if (article_id) {
    commentsByArticleIdPromises.push(checkExists("articles", "article_id", article_id));
  }
  
  Promise.all(commentsByArticleIdPromises)
    .then((resolvedPromises) => {
      const comments = resolvedPromises[0];
      res.status(200).send({ comments });
    }).catch(next)
}
