import { useSelector } from "react-redux";

const DocumentList = ({ documentListClickHandler, deleteDocumentHandler }) => {
  const document = useSelector((store) => store.document);
  return (
    <div>
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
            {document.searchDocuments.map((document) => {
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
