import { useState } from "react";
import { postComment } from "../Utils/api";
import { useContext } from "react";
import { LoggedIn } from "../contexts/LoggedIn";

export const AddComment = ({ setAllComments, article_id }) => {
  const { user } = useContext(LoggedIn);
  const [commentInputs, setCommentInputs] = useState({
    body: "",
    username: user.username,
  });
  const [errorMsg, setErrorMsg] = useState("");

  const changeComment = (value, key) => {
    setCommentInputs((currComment) => ({ ...currComment, [key]: value }));
  };

  const postCommentOnSubmit = (event) => {
    event.preventDefault();
    if (Object.entries(commentInputs).find((value) => value[1] === "")) {
      setErrorMsg("Please add a description");
      return null;
    }
    postComment(article_id, commentInputs)
      .then(({ comment }) => {
        setAllComments((currComments) => [comment, ...currComments]);
      })
      .catch((err) => {
        setErrorMsg(err.response.data.msg);
      });
  };

  return (
    <>
      <h1>Add Comment</h1>
      {errorMsg ? <p>{errorMsg}</p> : null}
      <form onSubmit={postCommentOnSubmit}>
        <input
          name="comment"
          placeholder="description"
          onChange={(event) => {
            changeComment(event.target.value, "body");
          }}
          value={commentInputs.body}
        ></input>
        <button type="submit">Add Comment</button>
      </form>
    </>
  );
};
