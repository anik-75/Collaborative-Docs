import React, { useEffect, useState } from "react";
import styles from "./Search.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Search() {
  const [query, setQuery] = useState("");
  const [searchingState, setSearchingState] = useState(false);
  const [retrieveData, setRetrieveData] = useState([]);
  const changeHandler = (event) => {
    if (event.target.value === "") {
      console.log("disbale");
      setSearchingState(false);
      setRetrieveData([]);
      setQuery("");
      return;
    }
    setSearchingState(true);
    setQuery(event.target.value);
  };
  const searchClickHandler = () => {
    setSearchingState(false);
    setRetrieveData([]);
    setQuery("");
    return;
  };
  console.log(query);
  return (
    <React.Fragment>
      <div>
        <div className={styles.search_container}>
          <FontAwesomeIcon
            className={styles.search_icon}
            icon={faMagnifyingGlass}
          />
          <input
            value={query}
            className={`${styles.input}
          ${!searchingState && styles.input_border}`}
            onChange={changeHandler}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Search;
