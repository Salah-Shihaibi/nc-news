import { timeSince } from "../Utils/pastTime";
import { useContext } from "react";
import { LoggedIn } from "../contexts/LoggedIn";
import { useState } from "react";
import { EditComment } from "./EditComment";

export const CommentCard = ({ comment, deleteComment, patchComment }) => {
  const { user } = useContext(LoggedIn);
  const { author, votes, created_at, body, comment_id } = comment;
  const [toggleComment, setToggleComment] = useState(true);

  if (toggleComment) {
    return (
      <div>
        author:{author} <br />
        body: {body} <br />
        <button>like</button>
        <button>dislike</button>
        {votes} Votes <br />
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
