const { createSecretToken } = require("../Middleware/Jwtverify");
const owner = require("../Model/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const LoginHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(403)
        .json({ message: "Enter all the fields", success: false });
    }

    const data = await owner.findOne({ email });
    if (!data) {
      return res.status(404).json({ message: "No data found", success: false });
    }

    if (data.password !== password) {
      return res
        .status(403)
        .json({ message: "Incorrect password", success: false });
    }

    const token = createSecretToken(data);
    res
      .status(201)
      .cookie("token", token, {
        httpOnly: false,
        maxAge: 24 * 60 * 60 * 1000,
        // sameSite: "none",
        // secure: true,
      })
      .json({ message: "User Login in successfully", success: true, data });
  } catch (err) {
    console.error("Error in LoginHandler:", err.message);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const RegisterHandler = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const existingUser = await owner.findOne({ email });

    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const user = await owner.create({ email, password, username });

    const token = createSecretToken(user);

    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "None",

        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ message: "User signed in successfully", success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const userVerification = async (req, res) => {
  try {
    console.log("Token from req.cookies:", req.cookies);
    console.log("secre key ", process.env.secret_key);
    if (!req.cookies || !req.cookies.token) {
      return res
        .status(404)
        .json({ message: "Token is missing", success: false });
    }

    const token = req.cookies.token;

    const data = jwt.verify(token, process.env.secret_key);
    console.log("this is  user verifaction data", data);
    console.log("this is  user verifaction name", data.name);
    const user = await owner.findById(data.id);

    if (user) {
      res.status(200).json({ status: true, user: user.username });
    } else {
      res.status(403).json({ status: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error in userVerification:", error.message);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

module.exports = {
  LoginHandler,
  RegisterHandler,
  userVerification,
};
