const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Untitled",
    },
    content: {
      type: Object,
      default: {},
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    collaborators: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    collaboratorsRole: {
      type: String,
      enum: ["view", "edit"],
      default: "view",
    },
  },
  { timestamps: true }
);

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
