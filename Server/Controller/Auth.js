const {
  createSecretToken,
  verifySecretToken,
} = require("../Middleware/Jwtverify");
const { hashPassword, verifyPassword } = require("../Middleware/hashpass");
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

    const isPasswordValid = await verifyPassword(password, data.password);

    if (!isPasswordValid) {
      return res
        .status(403)
        .json({ message: "Incorrect password", success: false });
    }

    const token = createSecretToken(data);

    // Set the cookie and send the response
    res
      .cookie("token", token, {
        httpOnly: false,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "None",
      })
      .status(201)
      .json({ message: "User Login in successfully", success: true });

    console.log("this is cookies hai ta login", req.cookies);
    // console.log("this is cookies hai ta login", res.getHeaders()["set-cookie"]);
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

    const hashedPassword = await hashPassword(password);
    console.log("this password is hassed Password", hashedPassword);
    const user = await owner.create({
      email,
      password: hashedPassword,
      username,
    });

    const token = createSecretToken(user);

    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "None",

        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ message: "User signed in successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const userVerification = async (req, res) => {
  try {
    if (!req.cookies || !req.cookies.token) {
      return res
        .status(404)
        .json({ message: "Token is missing", success: false });
    }

    const token = req.cookies.token;

    const data = verifySecretToken(token);

    // const data = jwt.verify(token, process.env.secret_key);

    const user = await owner.findById(data.id);

    if (user) {
      res.status(200).json({ status: true, data, user: user.username });
    } else {
      res.status(403).json({ status: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
const logout = async (req, res) => {
  try {
    if (req.cookies) {
      res.clearCookie("token");
      res
        .status(200)
        .json({ mesage: "cookie clear successfully", success: true });
    }
  } catch (e) {
    console.log(e);
    res.status(403).json({ message: e.message, success: false });
  }
};

const userData = (req, res) => {
  const data = {
    name: "Aabiskar dhenga",
    class: 10,
    isPass: true,
  };
  console.log("this is userDAta", req.userData);
  try {
    res.status(200).json({ message: data, success: true });
  } catch (e) {
    res.status(403).json({ message: e.message, success: false });
  }
};

module.exports = {
  LoginHandler,
  RegisterHandler,
  userVerification,
  userData,
  logout,
};
