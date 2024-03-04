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
const { testing } = require("../Middleware/testing");

const router = express.Router();

// const obj = {
//   name: "Aabiskar",
//   rollno: "12",

// };
const dataCollection = (req, res) => {
  const cookies = req.cookies;
  console.log("this is req.userData", req.userData);
  res.status(200).json({
    message: {
      student: "Deepti",
      age: 20,
    },
    success: true,
  });
};

router.post("/login", LoginHandler);
router.post("/register", RegisterHandler);
router.get("/data", testing, authMiddleware, dataCollection);
router.get("/user", testing, authMiddleware, userData);
router.post("/", testing, userVerification);
router.get("/logout", testing, logout);

module.exports = router;
