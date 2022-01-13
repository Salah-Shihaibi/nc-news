import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
export const SortFilter = ({ setSortBy, setOrder, order, sortBy }) => {
  return (
    <div>
      <FormControl className="mr-2 behind select_width" size="small">
        <InputLabel>Sort by</InputLabel>
        <Select
          value={sortBy}
          label="sortBy"
          onChange={(event) => {
            setSortBy(event.target.value);
          }}
        >
          <MenuItem value="created_at">Date</MenuItem>
          <MenuItem value="comment_count">Comments</MenuItem>
          <MenuItem value="votes">Votes</MenuItem>
        </Select>
      </FormControl>

      <FormControl className="behind" size="small">
        <InputLabel>Order</InputLabel>
        <Select
          value={order}
          label="order"
          onChange={(event) => {
            setOrder(event.target.value);
          }}
        >
          <MenuItem value="desc">
            {sortBy !== "created_at" ? "Most" : "Latest"}
          </MenuItem>
          <MenuItem value="asc">
            {sortBy !== "created_at" ? "Least" : "Oldest"}
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
