import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faLink } from "@fortawesome/free-solid-svg-icons";
import User from "../User";
import { useSocket } from "../../../context/useSocket";

function TextEditorHeader({
  title,
  setDocTitle,
  saveDocument,
  setShowShare,
  admin,
  readOnly,
}) {
  console.log(readOnly);

  const socket = useSocket();
  const changeTitleHandler = (e) => {
    setDocTitle(e.target.value);
    socket.emit("title-change", e.target.value);
    saveDocument({ docTitle: e.target.value });
  };

  return (
    <div className="flex flex-row items-center justify-between py-3 px-5 bg-[#edf2fa] box-border">
      <div className="flex flex-row items-center">
        {/* logo */}
        <div>
          <Link to="/">
            <h1 className="font-bold text-2xl">
              <FontAwesomeIcon icon={faFileLines} size="xl" />
            </h1>
          </Link>
        </div>
        {/* title */}
        <div className="flex flex-col">
          <div className="w-40 ml-5">
            <input
              onChange={changeTitleHandler}
              name="title"
              value={title}
              className={` px-1  text-justify text-sm py-1 bg-[#edf2fa] ${
                !readOnly ? "focus:bg-white border-2" : ""
              }`}
              readOnly={readOnly}
            />
          </div>
          {/* small menu */}
          <div className="ml-5">
            <ul className="flex flex-row h-4 text-sm py-1 ">
              <li className="mx-1">File</li>
              <li className="mx-1">View</li>
              <li className="mx-1">Edit</li>
              <li className="mx-1">Insert</li>
              <li className="mx-1">Format</li>
              <li className="mx-1">Tools</li>
              <li className="mx-1">Extension</li>
              <li className="mx-1">Help</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        {/* share button */}
        <div className="mr-10">
          <button
            className={` ${
              !admin ? "cursor-not-allowed opacity-50" : ""
            }   rounded-full bg-blue-300 text-black px-7 font-semibold py-2 shadow-md`}
            onClick={() => {
              setShowShare(true);
            }}
            disabled={!admin}
          >
            <FontAwesomeIcon icon={faLink} size="sm" />
            <span className="p-1">Share</span>
          </button>
        </div>
        {/* User */}
        <User />
      </div>
    </div>
  );
}

export default TextEditorHeader;
