import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/document/UI/NavBar";
import { useDispatch } from "react-redux";
import {
  createDocument,
  deleteDocument,
  fetchAllDocuments,
} from "../store/documents.slice";
import CreateDocument from "../components/document/CreateDocument";
import DocumentList from "../components/document/DocumentList";

function Homepage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // New Document create Handler
  async function createDocumentHandler() {
    dispatch(createDocument(navigate));
  }

  // fetch all documents of user
  useEffect(() => {
    dispatch(fetchAllDocuments());
  }, [dispatch]);

  // delete Document
  async function deleteDocumentHandler(documentId) {
    dispatch(deleteDocument(documentId));
  }

  function documentListClickHandler(documentId) {
    navigate(`/documents/${documentId}`);
  }

  return (
    <>
      {/* NavBar */}
      <NavBar />

      {/* New Document */}
      <CreateDocument createDocumentHandler={createDocumentHandler} />

      {/* Document List */}

      <DocumentList
        documentListClickHandler={documentListClickHandler}
        deleteDocumentHandler={deleteDocumentHandler}
      />
    </>
  );
}

export default Homepage;
