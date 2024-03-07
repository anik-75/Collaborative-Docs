import { Avatar, Dropdown } from "flowbite-react";
import { HiCog, HiOutlinePlusSm, HiLogout, HiViewGrid } from "react-icons/hi";
import avatar from "../../images/Avatar.png";
import { Link } from "react-router-dom";

function User() {
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
          <Dropdown.Item icon={HiOutlinePlusSm}>New Document</Dropdown.Item>
          <Dropdown.Item icon={HiCog}>Settings</Dropdown.Item>
          <Dropdown.Item icon={HiLogout}>Logout</Dropdown.Item>
        </Dropdown>
      </div>
    </>
  );
}

export default User;
