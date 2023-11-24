const {
  removeCommentByCommentId,
  updateVotesByCommentId,
} = require("../models/comments.model");

exports.deleteCommentByCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentByCommentId(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};

exports.patchVotesByCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  updateVotesByCommentId(inc_votes, comment_id)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};
