const jwt = require("jsonwebtoken");
const secret = "secret";
const Document = require("../models/Document");

module.exports.authenticateJwt = (req, res, next) => {
  const token = req.cookies.token;
  jwt.verify(token, secret, (err, data) => {
    if (err) {
      res.status(401).json({
        message: "Unauthorized",
      });
    } else {
      req.user = data.userId;
      next();
    }
  });
};

module.exports.addToCollaboratorsList = async function (req, res, next) {
  const userId = req.user;
  const documentId = req.params.documentId;
  try {
    const document = await Document.findById(documentId).populate("owner");

    if (!document.owner["_id"].equals(userId)) {
      const collaboratorIdx = document.collaborators.findIndex(
        (collaborator) => {
          return collaborator["_id"].equals(userId);
        }
      );
      if (collaboratorIdx === -1) {
        document.collaborators.push(userId);
        await document.save();
      }
    }
    next();
  } catch (error) {
    return res.status(404).json({
      message: "Document not found",
    });
  }
};

module.exports.isAuthorized = async function (req, res, next) {
  const userId = req.user;
  const documentId = req.params.documentId;

  try {
    const document = await Document.findById(documentId).populate("owner");
    if (document.owner["_id"].equals(userId)) {
      next();
    } else if (document.collaboratorsRole === "edit") {
      next();
    } else {
      return res.status(403).json({
        message: "Cannot edit document",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Document not found",
    });
  }
};

module.exports.isAdmin = async function (req, res, next) {
  const userId = req.user;
  const documentId = req.params.documentId;

  try {
    const document = await Document.findById(documentId).populate("owner");

    if (document.owner["_id"].equals(userId)) {
      req.userRole = "admin";
      next();
    }
  } catch (error) {
    return res.status(404).json({
      message: "Document not found",
    });
  }
};
