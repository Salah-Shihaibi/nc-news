import { useState } from "react";

export const Search = ({ setSearch }) => {
  const [searchDisplay, setSearchDisplay] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(searchDisplay);
    setSearchDisplay("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea
          onChange={(event) => {
            setSearchDisplay(event.target.value);
          }}
          value={searchDisplay}
          label="Search articles by title"
        />

        <button type="submit">🔍</button>
      </form>
    </>
  );
};
