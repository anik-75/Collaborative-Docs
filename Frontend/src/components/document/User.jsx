import { Avatar, Dropdown } from "flowbite-react";
import { HiCog, HiOutlinePlusSm, HiLogout, HiViewGrid } from "react-icons/hi";
import avatar from "../../images/Avatar.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createDocument } from "../../store/documents.slice";
import { logout } from "../../store/auth.slice";

function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function createDocumentHandler() {
    dispatch(createDocument(navigate));
  }

  function logoutHandler() {
    dispatch(logout(navigate));
  }

  return (
    <>
      <div className="mr-[1rem] ">
        <Dropdown
          label={<Avatar img={avatar} alt="avatar" rounded color={"red"} />}
          placement="bottom-end"
          className="border-2 border-blue-500  rounded-xl shadow-lg min-w-fit px-3 py-2 mr-10 z-[1000]"
          arrowIcon={false}
          inline
        >
          <Dropdown.Item icon={HiViewGrid} as={Link} to="/">
            Home
          </Dropdown.Item>
          {/* TODO Document Service */}
          <Dropdown.Item icon={HiOutlinePlusSm} onClick={createDocumentHandler}>
            New Document
          </Dropdown.Item>
          <Dropdown.Item icon={HiCog}>Settings</Dropdown.Item>
          <Dropdown.Item icon={HiLogout} onClick={logoutHandler}>
            Logout
          </Dropdown.Item>
        </Dropdown>
      </div>
    </>
  );
}

export default User;
