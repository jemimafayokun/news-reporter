const db = require("../db/connection");

exports.removeCommentByCommentId = (comment_id) => {
  return db
    .query(
      `SELECT * FROM comments
     WHERE comment_id = $1
  `,
      [comment_id]
    )
    .then((data) => {
      if (!data.rows.length) {
        return Promise.reject({ status: 404, msg: "comment does not exist" });
      }

      return db.query("DELETE FROM comments WHERE comment_id = $1", [
        comment_id,
      ]);
    });
};

exports.updateVotesByCommentId = (incVotes, commentId) => {
  return db
    .query(
      `SELECT * FROM comments
 WHERE comment_id = $1
`,
      [commentId]
    )
    .then((data) => {
      if (!data.rows.length) {
        return Promise.reject({ status: 404, msg: "comment does not exist" });
      }
      return db
        .query(
          `UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING *;`,
          [incVotes, commentId]
        )
        .then(({ rows }) => {
          return rows[0];
        });
    });
};
