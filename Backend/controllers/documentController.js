const Document = require("../models/Document");
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");
const Link = require("../models/Link");

module.exports.createDoc = async function createDoc(req, res) {
  const newDoc = {
    owner: req.user,
  };
  try {
    const createdDoc = await Document.create(newDoc);
    const user = await User.findById(req.user);
    user.document.push(createdDoc.id);
    await user.save();
    res.status(201).json({
      message: "Created successfully",
      id: createdDoc.id,
    });
    return;
  } catch {
    (err) => {
      res.status(400).json({ message: "Failed to create Document", err });
      return;
    };
  }
};

module.exports.getAllDocument = async function getAllDocument(req, res) {
  const userId = req.user;
  try {
    const user = await User.findById(userId).populate("document");
    if (user) {
      return res.status(200).json({
        document: user.document,
        message: "Documents found",
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({
      message: "Cannot Fetch Documents",
    });
    return;
  }
};

module.exports.getDocument = async function getDocument(req, res) {
  const id = req.params.documentId;
  try {
    const document = await Document.findById(id);
    if (document) {
      res.status(200).json({
        document,
        message: "Document found",
        owner: document.owner,
      });
    } else {
      res.status(404).json({ message: "Document not found" });
    }
    return;
  } catch (error) {
    res.status(500).json({
      message: "Error Occurred",
    });
    return;
  }
};

module.exports.updateDocument = async function updateDocument(req, res) {
  const id = req.params.documentId;
  const { title, content, collaboratorsRole } = req.body;
  try {
    const document = await Document.findById(id);

    try {
      if (title) {
        document.title = title;
      }
      if (content) {
        document.content = { ...content };
      }
      if (collaboratorsRole) {
        document.collaboratorsRole = collaboratorsRole;
      }

      const updatedDoc = await document.save();

      return res.status(200).json({
        updatedDoc,
        message: "Update successfully",
      });
    } catch (error) {
      // Handle validation errors
      if (error.name === "ValidationError") {
        return res.status(400).json({
          message: "Validation error",
          error: error.message,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error Occurred",
      error,
    });
  }
};

module.exports.deleteDocument = async function deleteDocument(req, res) {
  const id = req.params.documentId;
  try {
    const document = await Document.findByIdAndDelete(id);
    res.status(200).json({
      message: "Delete successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
