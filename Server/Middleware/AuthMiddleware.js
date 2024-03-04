// Middleware/AuthMiddleware.js
const jwt = require("jsonwebtoken");
const owner = require("../Model/user");
const { verifySecretToken } = require("./Jwtverify");

const Authmiddleware = async (req, res, next) => {
  try {
    if (!req.cookies || !req.cookies.token) {
      return res
        .status(403)
        .json({ message: "Unauthorized Access", success: false });
    }

    const token = req.cookies.token;
    const data = verifySecretToken(token);

    const user = await owner.findById(data?.id);

    if (!user) {
      return res
        .status(403)
        .json({ status: false, message: "Unauthorized access" });
    }

    req.userData = data;

    next();
  } catch (e) {
    return res.status(403).json({ message: e.message, success: false });
  }
};

module.exports = Authmiddleware;
