import React from "react";
import { useContext } from "react";
import { LoggedIn } from "../contexts/LoggedIn";
import DownloadIcon from "@mui/icons-material/Download";
import FileUpIcon from "@mui/icons-material/FileUpload";
export const VoteButton = ({ voting, totalVote, vote }) => {
  let { user } = useContext(LoggedIn);
  user = Object.keys(user).length === 0 ? null : user;
  return (
    <>
      <div className="vote_count">
        <FileUpIcon
          className={`${vote === 1 ? `green` : null} point`}
          onClick={() => {
            if (user) voting("like");
          }}
        />
        <span> {totalVote} </span>
        <DownloadIcon
          className={`${vote === -1 ? `red` : null} point`}
          onClick={() => {
            if (user) voting("dislike");
          }}
        />
      </div>
    </>
  );
};
