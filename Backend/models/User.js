const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  document: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Document",
      },
    ],
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
