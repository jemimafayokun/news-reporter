const db = require("../db/connection");

exports.getArticleByID = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then((data) => {
      if (!data.rows.length) {
        return Promise.reject({ status: 404, msg: "article does not exist" });
      } else {
        return data.rows[0];
      }
    });
};

exports.getAllArticles = () => {
  return db
    .query(
      `SELECT articles.article_id, title, topic, articles.author, articles.created_at, articles.votes, article_img_url , COUNT(comments.article_id) AS comment_count
        FROM comments 
        FULL OUTER JOIN articles
        ON articles.article_id = comments.article_id
        GROUP BY articles.article_id
        ORDER BY created_at DESC;`
    )
    .then((data) => {
      return data.rows;
    });
};
