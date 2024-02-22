import Modal from "./UI/Modal";
function Share({
  onClose,
  shareLink,
  saveDocument,
  setCollaboratorsRole,
  collaboratorsRole,
}) {
  const changeHandler = (e) => {
    // console.log(e.target.value);
    saveDocument({ collaboratorsRole: e.target.value });
    setCollaboratorsRole(e.target.value);
  };
  const copyHandler = async (e) => {
    try {
      await navigator.clipboard.writeText(e.target.value);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Modal onClose={onClose}>
      <div>
        <input
          className="border pr-14 py-2 px-3 w-3/4 m-5 mb-4 rounded-md border-gray-500 cursor-pointer "
          value={shareLink}
          onClick={copyHandler}
          readOnly={true}
        />
        <button className="w-1/6 border-blue-600 border-2 rounded-3xl  shadow-2xl text-lg  font-semibold text-white bg-blue-500 px-5 py-2">
          <select
            name="access"
            value={collaboratorsRole}
            onChange={changeHandler}
            className="border-0 bg-blue-500 block focus:outline-none active:outline-none min-w-full w-fit cursor-pointer"
          >
            <option value={"view"}>View</option>
            <option value={"edit"}>Edit</option>
          </select>
        </button>
      </div>
    </Modal>
  );
}

export default Share;
