import { Button } from "@mui/material";

export const InfiniteScroll = ({ totalCount, LIMIT, page, incLimit }) => {
  return (
    <>
      {page * LIMIT < totalCount + LIMIT ? (
        <div className="center my-10">
          <Button variant="contained" onClick={incLimit}>
            Load more...
          </Button>
        </div>
      ) : null}
    </>
  );
};
