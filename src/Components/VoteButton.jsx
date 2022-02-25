import { useContext } from "react";
import { LoggedIn } from "../contexts/LoggedIn";
import DownloadIcon from "@mui/icons-material/Download";
import FileUpIcon from "@mui/icons-material/FileUpload";
import { useNavigate } from "react-router-dom";

export const VoteButton = ({ voting, totalVote, vote }) => {
  const navigate = useNavigate();
  let { user } = useContext(LoggedIn);
  user = Object.keys(user).length === 0 ? null : user;
  return (
    <>
      <div className="vote_count chip">
        <FileUpIcon
          className={`${vote === 1 ? `green` : null} point`}
          onClick={() => {
            if (user) voting("like");
            else navigate("/login");
          }}
        />
        <span>{totalVote}</span>
        <DownloadIcon
          className={`${vote === -1 ? `red` : null} point`}
          onClick={() => {
            if (user) voting("dislike");
            else navigate("/login");
          }}
        />
      </div>
    </>
  );
};
