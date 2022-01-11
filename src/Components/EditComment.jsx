import { useState } from "react";
import { editComment } from "../Utils/api";

export const EditComment = ({ comment, setToggleComment, patchComment }) => {
  const [bodyInput, setBodyInput] = useState(comment.body);
  const [errorMsg, setErrorMsg] = useState("");

  const editCommentOnSubmit = (event) => {
    event.preventDefault();
    if (bodyInput === "") {
      setErrorMsg("Description is empty");
      return null;
    }
    patchComment(comment.comment_id, bodyInput);
    setToggleComment(true);
    editComment(comment.comment_id, { edit_body: bodyInput }).catch((err) => {
      setErrorMsg(err.response.data.msg);
    });
  };

  return (
    <>
      <h1>Edit Comment</h1>
      {errorMsg ? <p>{errorMsg}</p> : null}
      <form onSubmit={editCommentOnSubmit}>
        <textarea
          placeholder="description"
          onChange={(event) => {
            setBodyInput(event.target.value);
          }}
          value={bodyInput}
        />
        <button type="submit">Edit Comment</button>
        <button
          onClick={() => {
            setToggleComment(true);
          }}
        >
          Cancel
        </button>
      </form>
    </>
  );
};
