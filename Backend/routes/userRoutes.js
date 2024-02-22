const express = require("express");
const userRouter = express.Router();
const { signup, login } = require("../controllers/userController");

// Signup
userRouter.route("/signup").post(signup);
// Login
userRouter.route("/login").post(login);

module.exports = userRouter;
