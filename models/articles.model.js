const db = require("../db/connection");

exports.getArticleByID = (article_id, add_feature) => {
  if (add_feature === "comment_count") {
    return db
      .query(
        `SELECT articles.article_id, title, topic, articles.author, articles.created_at, articles.votes, article_img_url , COUNT(comments.article_id) AS comment_count
        FROM comments 
        FULL OUTER JOIN articles
        ON articles.article_id = comments.article_id
        WHERE articles.article_id = $1
        GROUP BY articles.article_id`,
        [article_id]
      )
      .then((data) => {
        if (!data.rows.length) {
          return Promise.reject({ status: 404, msg: "article does not exist" });
        }
        return data.rows[0];
      });
  }

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

exports.getAllArticles = (topic) => {
  const psqlQuery = `SELECT articles.article_id, title, topic, articles.author, articles.created_at, articles.votes, article_img_url , COUNT(comments.article_id) AS comment_count
FROM comments 
FULL OUTER JOIN articles
ON articles.article_id = comments.article_id `;

  if (topic) {
    return db
      .query(
        `${psqlQuery}
               WHERE articles.topic = $1
               GROUP BY articles.article_id
               ORDER BY created_at DESC;`,
        [topic]
      )
      .then((data) => {
        return data.rows;
      });
  }

  return db
    .query(
      `${psqlQuery}
        GROUP BY articles.article_id
        ORDER BY created_at DESC;`
    )
    .then((data) => {
      return data.rows;
    });
};

exports.insertCommentByArticleId = (article_id, username, body) => {
  return db
    .query(
      `SELECT * FROM articles
     WHERE articles.article_id = $1
`,
      [article_id]
    )
    .then((data) => {
      if (!data.rows.length) {
        return Promise.reject({ status: 404, msg: "article does not exist" });
      }
      return db
        .query(
          `INSERT INTO comments(author, body, votes, article_id)
  VALUES($1, $2, $3, $4) RETURNING *`,
          [username, body, (votes = 0), article_id]
        )
        .then((data) => {
          return data.rows[0];
        });
    });
};

exports.fetchCommentsByArticleId = (article_id) => {
  return db
    .query(
      `SELECT comment_id, comments.votes, comments.created_at, comments.author, comments.body, comments.article_id FROM comments
          WHERE comments.article_id = $1
          GROUP BY comments.comment_id
          ORDER BY created_at DESC;`,
      [article_id]
    )
    .then((data) => {
      return data.rows;
    });
};

exports.updateVotesByArticleId = (article_id, inc_votes) => {
  return db
    .query(
      `SELECT * FROM articles
   WHERE article_id = $1
`,
      [article_id]
    )
    .then((data) => {
      if (!data.rows.length) {
        return Promise.reject({ status: 404, msg: "article does not exist" });
      }
      return db
        .query(
          `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`,
          [inc_votes, article_id]
        )
        .then(({ rows }) => {
          return rows[0];
        });
    });
};
