import { timeSince } from "../utils/pastTime";
import { useContext } from "react";
import { LoggedIn } from "../contexts/LoggedIn";
import { useState } from "react";
import { EditComment } from "./EditComment";
import { useLike } from "../hooks/useLike";
import { editComment } from "../utils/api";
import { VoteButton } from "./VoteButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Popup } from "./Popup";
import { DeleteOption } from "./DeleteOption";
import { Link } from "react-router-dom";

export const CommentCard = ({ comment, deleteComment, patchComment }) => {
  const { user } = useContext(LoggedIn);
  const { author, votes, created_at, body, comment_id } = comment;
  const [toggleComment, setToggleComment] = useState(true);
  const { vote, voting } = useLike(comment_id, editComment);
  const [deleting, setDeleting] = useState(false);

  if (toggleComment) {
    return (
      <>
        {deleting ? (
          <Popup
            setShow={() => {
              setDeleting(false);
            }}
          >
            <DeleteOption
              setShow={() => {
                setDeleting(false);
              }}
              itemName={"this article"}
              deleteFunc={() => {
                deleteComment(comment_id);
              }}
            ></DeleteOption>
          </Popup>
        ) : null}
        <div className="comment_card">
          <span className="small_text">
            Posted by{" "}
            <Link
              className="profile_link"
              to={
                user.username === author ? "/dashboard" : `/profile/${author}`
              }
            >
              {author}
            </Link>{" "}
            . {timeSince(created_at)} ago
          </span>
          <p className="comment_body">{body}</p>
          <div className="wrap_global">
            <VoteButton voting={voting} totalVote={votes + vote} vote={vote} />
            <div className="edit_delete width100">
              {author === user.username ? (
                <>
                  <DeleteOutlineIcon
                    className="red point"
                    onClick={() => {
                      setDeleting(true);
                    }}
                  />
                  <EditOutlinedIcon
                    className="blue point"
                    onClick={() => setToggleComment(false)}
                  />
                </>
              ) : null}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <EditComment
          comment={comment}
          setToggleComment={setToggleComment}
          patchComment={patchComment}
        />
      </>
    );
  }
};
