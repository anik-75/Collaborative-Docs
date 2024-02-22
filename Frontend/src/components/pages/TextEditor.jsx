import EditorToolbar, { modules, formats } from "../Document/EditorToolbar";
import { io } from "socket.io-client";

import { useEffect, useState, Fragment } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../../App";
import TextEditorHeader from "../Document/UI/TextEditorHeader";
import Share from "../Document/Share";
import { useRecoilValue } from "recoil";
import { UserState } from "../../recoil/UserAtom";

function TextEditor() {
  const [editorValue, setEditorValue] = useState({}); // Initialize with empty Delta
  const [docTitle, setDocTitle] = useState("");
  const [showShare, setShowShare] = useState(false);
  const [shareLink, setShareLink] = useState("http");
  const [socket, setSocket] = useState(null);
  const params = useParams();
  const documentId = params.documentId;

  const [docOwner, setDocOwner] = useState(false);
  const userId = useRecoilValue(UserState);
  const [collaboratorsRole, setCollaboratorsRole] = useState("view");

  // Fetch document for /:documentId
  useEffect(() => {
    async function fetchDocumentContent() {
      try {
        const document = await axios.get(`${url}/document/${documentId}`, {
          withCredentials: true,
        });
        setDocTitle(document.data.document.title);
        setEditorValue(document.data.document.content);
        setShareLink(`${window.location.origin}${window.location.pathname}`);
        setCollaboratorsRole(document.data.document.collaboratorsRole);
        if (String(document.data.owner) === String(userId.userId)) {
          setDocOwner(true);
        }
        if (socket != null) {
          socket.emit("join-document", document.data.document["_id"]);
        }
      } catch (err) {
        console.error(err);
        return;
      }
    }
    fetchDocumentContent();
  }, [documentId, userId.userId, socket]);

  // Initialize socket.io connection
  useEffect(() => {
    const s = io("http://localhost:3000");
    setSocket(s);
    s.on("connect", () => {
      console.log(s.id);
    });
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null) return;
    function handleReceiveChange(data) {
      // Merge received Delta into the existing editor content
      console.log(data);
      setEditorValue(data);
    }
    socket.on("receive-change", handleReceiveChange);
    // cleanup
    return () => {
      socket.off("receive-change", handleReceiveChange);
    };
  }, [socket]);

  const handleEditorChange = async (content, delta, source, editor) => {
    // Send changes to the socket to update other users
    if (source !== "user") return;
    console.log(editor.getContents());
    setEditorValue(editor.getContents());
    socket.emit("text-change", editor.getContents());
    saveDocument({ content: editor.getContents() });
  };

  const saveDocument = async ({ content, docTitle, collaboratorsRole }) => {
    // save data to DB
    // socket.emit("text-change", content);
    // console.log(content);
    const data = await axios.put(
      `${url}/document/${documentId}`,
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
    console.log(data);
  };

  // shareLink
  // const shareLinkHandler = async (access) => {
  //   try {
  //     const data = await axios.post(
  //       `${url}/document/${documentId}/share`,
  //       {
  //         access,
  //       },
  //       {
  //         withCredentials: true,
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     console.log(data.data.link);
  //     setShareLink(data.data.link);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
