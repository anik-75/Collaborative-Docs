import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../App";
import { useNavigate } from "react-router-dom";
import NavBar from "../Document/UI/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
function Homepage() {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  // New Document create Handler
  async function createDocumentHandler() {
    const data = await axios.post(
      `${url}/document/create`,
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
    if (data.status === 201) navigate(`/document/${data.data.id}`);
  }

  // fetch all documents of user
  useEffect(() => {
    const fetchAllDocs = async () => {
      try {
        const data = await axios.get(`${url}/document`, {
          withCredentials: true,
        });
        console.log(data);
        setDocuments(data.data.document);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllDocs();
  }, []);

  function documentListClickHandler(documentId) {
    navigate(`/document/${documentId}`);
  }
  console.log(documents);
  return (
    <Fragment>
    {/* NavBar */}
      <NavBar />
    {/* New Document */}
      <div className="h-60 border-2 flex flex-row  items-center bg-[#f1f3f4]">
        <button
          type="button"
          onClick={createDocumentHandler}
          className="bg-blue-300 rounded-md w-40 h-44 text-3xl shadow-2xl ml-40 text-gray-700"
        >
          <div className="flex flex-col ">
            <FontAwesomeIcon icon={faPlus} size="xl" />
            <span className="text-lg p-2 text-black font-bold">
              New Document
            </span>
          </div>
        </button>
      </div>
    {/* Document List */}
      <ul>
        <li className=" font-bold text-2xl text-center p-3 flex flex-row justify-around items-center text-blue-800 border-b-2">
          <span>Title</span>
          <span>Last Edit</span>
          <span>Created On</span>
        </li>
        {documents.map((document) => {
          const createdAt = document.createdAt;
          const updatedAt = document.updatedAt;
          let createdDate = new Date(createdAt);
          let updatedDate = new Date(updatedAt);
          return (
            <li
              className="font-normal p-3 text-center flex flex-row justify-around  items-center border-b-2 cursor-pointer"
              key={document._id}
              onClick={() => {
                documentListClickHandler(document._id);
              }}
            >
              <span>{document.title}</span>
              <span>{updatedDate.toUTCString()}</span>
              <span>{createdDate.toDateString()}</span>
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
}

export default Homepage;
