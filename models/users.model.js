const db = require("../db/connection");

exports.fetchAllUsers = () => {
  return db.query("SELECT * FROM users").then((data) => {
    return data.rows;
  });
};

exports.getUserByUsername = (username) => {
  return db
    .query("SELECT * FROM users WHERE username = $1", [username])
    .then((data) => {
      if (!data.rows.length) {
        return Promise.reject({ status: 400, msg: "username does not exist" });
      }
      return data.rows[0];
    });
};
