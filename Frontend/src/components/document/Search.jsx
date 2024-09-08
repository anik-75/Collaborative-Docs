import React, { useState } from "react";
import styles from "./Search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { findDocuments } from "../../store/documents.slice";

function Search() {
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");
  const [searchingState, setSearchingState] = useState(false);

  const changeHandler = (event) => {
    if (event.target.value === "") {
      setQuery(event.target.value);
      setSearchingState(false);
      dispatch(findDocuments(event.target.value));
      return;
    }
    setQuery(event.target.value);
    setSearchingState(true);
    dispatch(findDocuments(event.target.value));
  };

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
