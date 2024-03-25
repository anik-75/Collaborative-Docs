import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSortDown } from "react-icons/fa";
import { FaSortUp } from "react-icons/fa";
import { sortDocuments } from "../../store/documents.slice";

const DocumentList = ({ documentListClickHandler, deleteDocumentHandler }) => {
  const document = useSelector((store) => store.document.searchDocuments);
  const dispatch = useDispatch();
  console.log(document);
  const [sort, setSort] = useState({
    sortBy: "updatedAt",
    sortOrder: "DESC",
  });

  function sortHandler(sortBy, sortOrder) {
    setSort({
      sortBy,
      sortOrder,
    });
    dispatch(sortDocuments({ sortBy, sortOrder }));
    console.log("doc", document);

    setSort((prevState) => {
      return {
        sortBy: prevState.sortBy,
        sortOrder: sortOrder === "ASC" ? "DESC" : "ASC",
      };
    });
  }
  return (
    <div>
      <div className="flex justify-center">
        <table className="min-w-[70%] divide-y divide-gray-200 dark:divide-gray-700 border-collapse">
          <thead>
            <tr>
              <th
                scope="col"
                className="flex items-center cursor-pointer  px-6 py-3 text-start text-base font-medium text-gray-500 uppercase"
              >
                <span className="flex">
                  {sort &&
                  sort.sortBy === "title" &&
                  sort.sortOrder === "ASC" ? (
                    <FaSortUp onClick={() => sortHandler("title", "ASC")} />
                  ) : (
                    <FaSortDown onClick={() => sortHandler("title", "DESC")} />
                  )}
                  <span>Title</span>
                </span>
              </th>
              <th
                scope="col"
                className=" cursor-pointer px-6 py-3 text-start text-base font-medium text-gray-500 uppercase"
              >
                <span className="flex">
                  {sort &&
                  sort.sortBy === "updatedAt" &&
                  sort.sortOrder === "ASC" ? (
                    <FaSortUp onClick={() => sortHandler("updatedAt", "ASC")} />
                  ) : (
                    <FaSortDown
                      onClick={() => sortHandler("updatedAt", "DESC")}
                    />
                  )}
                  <span>Last Edit</span>
                </span>
              </th>
              <th
                scope="col"
                className="cursor-pointer px-6 py-3 text-start text-base font-medium text-gray-500 uppercase"
              >
                <span className="flex">
                  {sort &&
                  sort.sortBy === "createdAt" &&
                  sort.sortOrder === "ASC" ? (
                    <FaSortUp onClick={() => sortHandler("createdAt", "ASC")} />
                  ) : (
                    <FaSortDown
                      onClick={() => sortHandler("createdAt", "DESC")}
                    />
                  )}
                  <span>Created On</span>
                </span>
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
            {document.map((document) => {
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
    </div>
  );
};

export default DocumentList;
