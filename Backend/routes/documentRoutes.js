const express = require("express");
const documentRouter = express.Router();
const {
  getDocument,
  getAllDocument,
  createDoc,
  updateDocument,
  deleteDocument,
} = require("../controllers/documentController");
const {
  authenticateJwt,
  isAuthorized,
  addToCollaboratorsList,
  isAdmin,
} = require("../middlewares/authMiddleware");

// @type: POST
// @route: /document/create
// @description: create doc
// @access: private
documentRouter.route("/create").post(authenticateJwt, createDoc);

// @type: GET
// @route: /
// @description: get all documents
// @access: private
documentRouter.route("/").get(authenticateJwt, getAllDocument);

// @type: GET
// @route: /document/:documentId
// @description: get document
// @access: private (add user to Collaborators list)
documentRouter
  .route("/:documentId")
  .get(authenticateJwt, addToCollaboratorsList, getDocument);

// @type: PUT
// @route: /document/:documentId
// @description: update doc
// @access: private if (user is admin or collaboratorRole is edit)
documentRouter
  .route("/:documentId")
  .put(authenticateJwt, isAuthorized, updateDocument);

// @type: DELETE
// @route: /document/:documentId
// @description: delete doc
// @access: private (user is[admin])
documentRouter
  .route("/:documentId")
  .delete(authenticateJwt, isAdmin, deleteDocument);

module.exports = documentRouter;

// const {
//   documentShareLink,
//   getSharedDocument,
// } = require("../controllers/linkController");

// @type: POST
// @route: /document/:documentId/share
// @description: share doc link
// @access: private (user is[admin])
// documentRouter
//   .route("/:documentId/share")
//   .post(authenticateJwt, documentShareLink);

// @type: GET
// @route: /document/:documentId/share/:linkId
// @description: get the document using sharelink
// @access: private (user is authenticated)
// documentRouter
//   .route("/:documentId/share/:linkId")
//   .get(authenticateJwt, getSharedDocument);
