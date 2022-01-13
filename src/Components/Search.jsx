import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export const Search = ({ setSearch, display }) => {
  const [searchDisplay, setSearchDisplay] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(searchDisplay);
    setSearchDisplay("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={`search_form ${display}`}>
        <div className="search_bar">
          <input
            className="search_input"
            onChange={(event) => {
              setSearchDisplay(event.target.value);
            }}
            value={searchDisplay}
            placeholder="Search articles by title"
          />
          <SearchIcon className="point" color="action" onClick={handleSubmit} />
        </div>
      </form>
    </>
  );
};
