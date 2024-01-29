const jwt = require("jsonwebtoken");
require("dotenv").config();
const owner = require("../Model/user");

const createSecretToken = (data) => {
  console.log("this is secreat  data token  ", data.username);
  return jwt.sign(
    { name: data.username, id: data._id.toString() },
    process.env.secret_key,
    {
      expiresIn: 3 * 24 * 60 * 60,
    }
  );
};

module.exports = { createSecretToken };
