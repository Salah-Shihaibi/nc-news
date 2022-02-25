import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../style/Search.module.css";
export const Search = ({ setSearch, display }) => {
  const [searchDisplay, setSearchDisplay] = useState("");
  const [focused, setFocused] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(searchDisplay);
    setSearchDisplay("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={`${styles[display]}`}>
        <div
          className={`${styles.search_bar} ${styles.mobile_search_width} ${styles[focused]}`}
        >
          <input
            className={styles.search_input}
            onChange={(event) => {
              setSearchDisplay(event.target.value);
            }}
            value={searchDisplay}
            placeholder="Search articles by title"
            onFocus={() => {
              setFocused("focus");
            }}
            onBlur={() => {
              setFocused("");
            }}
          />
          <SearchIcon className="point" color="action" onClick={handleSubmit} />
        </div>
      </form>
    </>
  );
};
