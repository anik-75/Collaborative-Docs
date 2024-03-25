import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const CreateDocument = ({ createDocumentHandler }) => {
  return (
    <div className="h-60 border-2 flex flex-row  items-center bg-[#f1f3f4]">
      <button
        type="button"
        onClick={createDocumentHandler}
        className="bg-blue-300 rounded-md w-40 h-44 text-3xl shadow-2xl ml-40 text-gray-700"
      >
        <div className="flex flex-col ">
          <FontAwesomeIcon icon={faPlus} size="xl" />
          <span className="text-lg p-2 text-black font-bold">New Document</span>
        </div>
      </button>
    </div>
  );
};

export default CreateDocument;
