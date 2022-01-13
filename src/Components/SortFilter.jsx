import React from "react";

export const SortFilter = ({
  setSortBy,
  setOrder,
  sortBy,
  lastTenMins,
  setLastTenMins,
}) => {
  return (
    <div>
      <label forhtml="sortBy">Sort by</label>
      <br />
      <select
        id="sortBy"
        name="sortBy"
        onChange={(event) => {
          setSortBy(event.target.value);
        }}
      >
        <option value="created_at">Date</option>
        <option value="comment_count">Comments</option>
        <option value="votes">Votes</option>
      </select>
      <label forhtml="order"> Order </label>
      <br />
      <select
        id="order"
        name="order"
        onChange={(event) => {
          setOrder(event.target.value);
        }}
      >
        <option value="desc">
          {sortBy !== "created_at" ? "Most" : "Latest"}
        </option>
        <option value="asc">
          {sortBy !== "created_at" ? "Least" : "Oldest"}
        </option>
      </select>
      <input
        type="checkbox"
        name="lastTenMins"
        value={lastTenMins ? "" : "true"}
        onChange={(event) => {
          setLastTenMins(event.target.value);
        }}
      />
       <label forhtml="lastTenMins">10 mins</label>
      <br></br>
    </div>
  );
};
