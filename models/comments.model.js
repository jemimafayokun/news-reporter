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
  