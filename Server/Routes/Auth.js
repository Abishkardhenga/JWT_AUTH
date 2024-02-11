const express = require("express");
const {
  LoginHandler,
  RegisterHandler,
  userVerification,
  logout,
  userData,
  // LogoutHandler,
  // Getuser,
} = require("../Controller/Auth");
const authMiddleware = require("../Middleware/AuthMiddleware");

const router = express.Router();

// const obj = {
//   name: "Aabiskar",
//   rollno: "12",

// };
const dataCollection = (req, res) => {
  const cookies = req.cookies;
  console.log("this is cookies", cookies);
  res.status(200).json({ message: "data", success: true });
};

router.post("/login", LoginHandler);
router.post("/register", RegisterHandler);
router.get("/data", dataCollection);
router.get("/user", authMiddleware, userData);
router.post("/", userVerification);
router.get("/logout", logout);

module.exports = router;
