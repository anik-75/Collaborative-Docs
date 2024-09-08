import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const CreateDocument = ({ createDocumentHandler }) => {
  return (
    <div className="h-60 border-2 flex flex-row  items-center justify-center bg-[#f1f3f4]">
      <button
        type="button"
        onClick={createDocumentHandler}
        className="flex flex-col justify-around items-center bg-blue-300 rounded-xl w-80 h-44 text-3xl shadow-2xl  text-gray-700 border-[1px] border-white"
      >
        <FontAwesomeIcon icon={faPlus} size="lg" className="relative top-7" />
        <span className="text-lg text-[#2F302C] font-bold ">New Document</span>
      </button>
    </div>
  );
};

export default CreateDocument;
