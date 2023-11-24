const { fetchAllUsers, getUserByUsername } = require("../models/users.model");

exports.getUsers = (req, res, next) => {
  fetchAllUsers().then((users) => {
    res.status(200).send({ users });
  });
};

exports.getUser = (req, res, next) => {
  const { username } = req.params;
  getUserByUsername(username)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};
