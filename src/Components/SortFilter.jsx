import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
export const SortFilter = ({
  setSortBy,
  setOrder,
  order,
  sortBy,
  userLikedArticles,
  userArticles,
  setUserArticles,
  author,
}) => {
  return (
    <div>
      {author || userLikedArticles ? (
        <FormControl className="mr-2 behind" size="small">
          <InputLabel>Articles</InputLabel>
          <Select
            value={userArticles}
            label="Articles"
            onChange={(event) => {
              setUserArticles(event.target.value);
            }}
          >
            <MenuItem value={author}>User articles</MenuItem>
            <MenuItem value={userLikedArticles}>Liked articles</MenuItem>
          </Select>
        </FormControl>
      ) : null}

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
