import {
  editComment,
  fetchUserVotedComment,
  removeUserVotedComment,
  postUserVotedComment,
  editUserVotedComment,
} from "../utils/api";
import { timeSince } from "../utils/pastTime";
import { useContext } from "react";
import { LoggedIn } from "../contexts/LoggedIn";
import { useState } from "react";
import { EditComment } from "./EditComment";
import { useLike } from "../hooks/useLike";
import { VoteButton } from "./VoteButton";
import { Link } from "react-router-dom";
import { DeletePopup } from "./DeletePopup";
import { EditDelete } from "./EditDelete";
import styles from "../style/CommentCard.module.css";

export const CommentCard = ({ comment, deleteComment, patchComment }) => {
  const { user } = useContext(LoggedIn);
  const { author, votes, created_at, body, comment_id } = comment;
  const [toggleComment, setToggleComment] = useState(true);
  const { vote, voting, voteCounter } = useLike(
    comment_id,
    editComment,
    fetchUserVotedComment,
    removeUserVotedComment,
    postUserVotedComment,
    editUserVotedComment,
    "userLikedComments",
    "comment_id"
  );
  const [deleting, setDeleting] = useState(false);

  if (toggleComment) {
    return (
      <>
        <DeletePopup
          deleting={deleting}
          setDeleting={setDeleting}
          deleteFunc={() => {
            deleteComment(comment_id);
          }}
          itemName={"this comment"}
        />
        <div className="mb-20">
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
          <p className={styles.comment_body}>{body}</p>
          <div className="wrap_global">
            {/* <VoteButton voting={voting} totalVote={votes + vote} vote={vote} /> */}
            <VoteButton
              voting={voting}
              totalVote={votes + voteCounter + vote}
              vote={vote}
            />
            <EditDelete
              author={author}
              editFunc={() => setToggleComment(false)}
              setDeleting={setDeleting}
            />
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
