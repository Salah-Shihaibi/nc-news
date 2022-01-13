import { timeSince } from "../Utils/pastTime";
import { useContext } from "react";
import { LoggedIn } from "../contexts/LoggedIn";
import { useState } from "react";
import { EditComment } from "./EditComment";
import { useLike } from "../hooks/useLike";
import { editComment } from "../Utils/api";
import { VoteButton } from "./VoteButton";

export const CommentCard = ({ comment, deleteComment, patchComment }) => {
  const { user } = useContext(LoggedIn);
  const { author, votes, created_at, body, comment_id } = comment;
  const [toggleComment, setToggleComment] = useState(true);
  const { vote, voting } = useLike(comment_id, editComment);

  if (toggleComment) {
    return (
      <div>
        author:{author} <br />
        body: {body} <br />
        <VoteButton voting={voting} />
        {votes + vote} Votes <br />
        <p>Date: {timeSince(created_at)} ago</p>
        {author === user.username ? (
          <>
            <button
              onClick={() => {
                deleteComment(comment_id);
              }}
            >
              Delete
            </button>
            <button
              onClick={() => {
                setToggleComment(false);
              }}
            >
              Edit
            </button>
          </>
        ) : null}
      </div>
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
