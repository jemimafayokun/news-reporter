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
