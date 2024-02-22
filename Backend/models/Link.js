const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  document: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
    required: true,
  },
  access: {
    type: String,
    enum: ["edit", "view"],
    required: true,
  },
  linkId: {
    type: String,
    unique: true,
    required: true,
  },
});

const Link = mongoose.model("Link", linkSchema);
module.exports = Link;
