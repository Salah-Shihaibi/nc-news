import React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import FileUpIcon from "@mui/icons-material/FileUpload";
export const VoteButton = ({ voting, totalVote, vote }) => {
  return (
    <>
      <div className="vote_count">
        <FileUpIcon
          className={`${vote === 1 ? `green` : null} point`}
          onClick={() => {
            voting("like");
          }}
        />
        <span> {totalVote} </span>
        <DownloadIcon
          className={`${vote === -1 ? `red` : null} point`}
          onClick={() => {
            voting("dislike");
          }}
        />
      </div>
    </>
  );
};
