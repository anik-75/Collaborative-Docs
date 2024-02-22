const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const secret = process.env.SECRET;

// Signup
module.exports.signup = async function signup(req, res) {
  const { email, username, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }
    // TODO: Hash the password
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      username,
      password: hash,
    });

    // Save the user to the database
    await newUser.save();

    return res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.login = async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the password
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, secret, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
    });
    res.status(200).json({ token, username: user.username, userId: user._id });
    return;
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
