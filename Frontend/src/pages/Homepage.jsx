import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/document/UI/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  createDocument,
  deleteDocument,
  fetchAllDocuments,
} from "../store/documents.slice";

function Homepage() {
  const documents = useSelector((store) => store.document);
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
      <div className="flex justify-center">
        <table className="min-w-[70%] divide-y divide-gray-200 dark:divide-gray-700 border-collapse">
          <thead>
            <tr>
              <th
                scope="col"
                className="  px-6 py-3 text-start text-base font-medium text-gray-500 uppercase"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-start text-base font-medium text-gray-500 uppercase"
              >
                Last Edit
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-start text-base font-medium text-gray-500 uppercase"
              >
                Created On
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-end text-base font-medium text-gray-500 uppercase"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {documents.map((document) => {
              let createdAt = document.createdAt;
              let updatedAt = document.updatedAt;
              createdAt = new Date(createdAt);
              updatedAt = new Date(updatedAt).toUTCString();
              updatedAt = updatedAt.slice(0, updatedAt.length - 7);

              return (
                <tr
                  key={document["_id"]}
                  className="odd:bg-white even:bg-gray-100  cursor-pointer"
                  onClick={() => {
                    documentListClickHandler(document._id);
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                    {document.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                    {updatedAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                    {createdAt.toDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                    <button
                      type="button"
                      className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-s border-red-400 px-2 py-1 text-red-600 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none "
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteDocumentHandler(document["_id"]);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default Homepage;
