import { Fragment } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Search from "../Search";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import styles from "./NavBar.module.css";
import User from "../User";
function NavBar() {
  return (
    <Fragment>
      <nav className={styles.nav}>
        <Link to="/">
          <h1 className="font-bold text-2xl">
            <FontAwesomeIcon icon={faFileLines} size="xl" />
            <span className="ml-1 text-blue-500">Docs</span>
          </h1>
        </Link>
        <Search />
        <User />
      </nav>
    </Fragment>
  );
}

export default NavBar;
