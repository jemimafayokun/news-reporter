const { allTopics } = require("../models/topics.model");

exports.getTopics = (req, res, next) => {
  allTopics()
    .then((allTopics) => {
      res.status(200).send({ topics: allTopics });
    })
    .catch(next);
};
