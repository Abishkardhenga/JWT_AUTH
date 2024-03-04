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

const verifySecretToken = (data) => {
  const verifiedData = jwt.verify(data, process.env.secret_key);
  return verifiedData;
};

module.exports = { createSecretToken, verifySecretToken };
