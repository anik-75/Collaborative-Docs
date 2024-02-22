import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserAstronaut,
} from "@fortawesome/free-solid-svg-icons";

function User() {
  return (
    <button className="border-2 border-blue-500 bg-blue-300 rounded-3xl shadow-lg min-w-fit px-3 py-2 mx-10">
      <FontAwesomeIcon icon={faUserAstronaut} size="xl" />
    </button>
  );
}

export default User;
