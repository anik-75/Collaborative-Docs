const Document = require("../models/Document");
const { v4: uuidv4 } = require("uuid");
const Link = require("../models/Link");
module.exports.documentShareLink = async function (req, res) {
  const { access } = req.body;
  let { documentId } = req.params;
  try {
    const document = await Document.findById(documentId);

    if (!document) {
      res.status(404).json({
        message: "Document not found",
      });
      return;
    }

    let linkId;
    if (access === "view" && document.viewLink) {
      linkId = document.viewLink;
    } else if (access === "edit" && document.editLink) {
      linkId = document.editLink;
    } else {
      // create links
      const uid = uuidv4();
      const linkInDB = {
        document,
        access,
        linkId: uid,
      };
      const link = await Link.create(linkInDB);
      if (access === "edit") {
        linkId = uid;
        document.editLink = link;
      } else if (access === "view") {
        linkId = uid;
        document.viewLink = link;
      } else {
        res.json(403).json({
          message: "Access denied",
        });
      }
      let updateddocument = await document.save();
      console.log(link);
      console.log(await updateddocument.populate("viewLink"));
    }

    const link = `${req.protocol}://${req.get("host")}${
      req.originalUrl
    }/${linkId}`;
    console.log(link);
    return res.status(200).json({
      message: "link created succesfully",
      link,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      err,
      message: "Server error",
    });
  }
};

module.exports.getSharedDocument = async function (req, res) {
  const { linkId } = req.params;

  try {
    const link = await Link.findById(linkId).populate("document");
    if (link) {
      const document = link.document;
      console.log(document);
      //TODO: add collaborator
      
      res.status(200).json(document);
    } else {
      res.status(404).json({
        message: "Invalid link",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
      err,
    });
  }
};
