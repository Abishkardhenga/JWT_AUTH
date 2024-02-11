// Middleware/AuthMiddleware.js
const jwt = require("jsonwebtoken");
const owner = require("../Model/user");

const Authmiddleware = async (req, res, next) => {
  console.log("Cookies received in middleware:", req.cookies);

  try {
    if (!req.cookies || !req.cookies.token) {
      return res
        .status(403)
        .json({ message: "Unauthorized Access", success: false });
    }

    const token = req.cookies.token;
    const data = jwt.verify(token, process.env.secret_key);
    console.log("this is data", data);
    console.log("this is data id", data.id);
    const user = await owner.findById(data?.id);

    if (!user) {
      return res
        .status(403)
        .json({ status: false, message: "Unauthorized access" });
    }

    // Set user data on the request for later use in the route handler
    req.userData = data;

    // Continue to the next middleware or route handler
    next();
  } catch (e) {
    return res.status(403).json({ message: e.message, success: false });
  }
};

module.exports = Authmiddleware;
