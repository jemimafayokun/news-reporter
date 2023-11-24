const {
  deleteCommentByCommentId,
  patchVotesByCommentId,
} = require("../controllers/comments.controller");

const commentsRouter = require("express").Router();

commentsRouter.delete("/:comment_id", deleteCommentByCommentId);
commentsRouter.patch("/:comment_id", patchVotesByCommentId);

module.exports = commentsRouter;
