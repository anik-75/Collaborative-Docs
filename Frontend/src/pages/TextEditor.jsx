import EditorToolbar, {
  modules,
  formats,
} from "../components/document/EditorToolbar";

import { useEffect, useState, Fragment } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import TextEditorHeader from "../components/document/UI/TextEditorHeader";
import Share from "../components/document/Share";
import { useSocket } from "../components/context/useSocket";
import { useSelector } from "react-redux";

function TextEditor() {
  const [editorValue, setEditorValue] = useState({});
  const [docTitle, setDocTitle] = useState("");
  const [showShare, setShowShare] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [docOwner, setDocOwner] = useState(false);
  const [collaboratorsRole, setCollaboratorsRole] = useState("view");

  const params = useParams();
  const documentId = params.documentId;
  const user = useSelector((store) => store.users);
  const socket = useSocket();

  // Fetch document for /:documentId
  useEffect(() => {
    async function fetchDocumentContent() {
      try {
        const document = await axios.get(`/api/documents/${documentId}`, {
          withCredentials: true,
        });
        setDocTitle(document.data.document.title);
        setEditorValue(document.data.document.content);
        setShareLink(`${window.location.origin}${window.location.pathname}`);
        setCollaboratorsRole(document.data.document.collaboratorsRole);
        if (String(document.data.owner) === String(user?.userId)) {
          setDocOwner(true);
        }
        if (socket) {
          socket.emit("join-document", document.data.document["_id"]);
        }
      } catch (err) {
        console.error(err);
        return;
      }
    }
    fetchDocumentContent();
  }, [documentId, user?.userId, socket]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    function handleReceiveChange(data) {
      // Merge received Delta into the existing editor content
      setEditorValue(data);
    }
    function handleTitleChange(title) {
      setDocTitle(title);
    }
    socket.on("receive-change", handleReceiveChange);
    socket.on("receive-title-change", handleTitleChange);
    // cleanup
    return () => {
      if (socket) {
        socket.off("receive-change", handleReceiveChange);
        socket.off("receive-title-change", handleTitleChange);
      }
    };
  }, [socket]);

  const handleEditorChange = async (content, delta, source, editor) => {
    // Send changes to the socket to update other users
    if (source !== "user") return;
    setEditorValue(editor.getContents());
    saveDocument({ content: editor.getContents() });
  };

  const saveDocument = async ({ content, docTitle, collaboratorsRole }) => {
    // save data to DB
    try {
      const data = await axios.put(
        `/api/documents/${documentId}`,
        {
          title: docTitle,
          content: content,
          collaboratorsRole,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      {/* Header */}
      <TextEditorHeader
        setDocTitle={setDocTitle}
        title={docTitle}
        saveDocument={saveDocument}
        setShowShare={setShowShare}
        admin={docOwner}
      />

      {/* Editor ToolBar */}
      <div className="text-editor bg-[#f3f3f3]">
        <div className="box-border  bg-[#f1f3f4] w-full h-1/5 border-2 border-slate-200 py-2 flex flex-row justify-center sticky top-0 z-[10]">
          <EditorToolbar />
        </div>

        {/* Editor */}
        <div className="flex flex-row justify-center">
          <ReactQuill
            className="m-5 "
            value={editorValue}
            onChange={handleEditorChange}
            theme="snow"
            placeholder={"Write something awesome..."}
            modules={modules}
            formats={formats}
            readOnly={docOwner || collaboratorsRole === "edit" ? false : true}
          />
        </div>
      </div>

      {/* Share Modal */}
      {docOwner && showShare && (
        <Share
          onClose={setShowShare}
          saveDocument={saveDocument}
          collaboratorsRole={collaboratorsRole}
          setCollaboratorsRole={setCollaboratorsRole}
          shareLink={shareLink}
        />
      )}
    </Fragment>
  );
}

export default TextEditor;
