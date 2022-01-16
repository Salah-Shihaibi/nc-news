import { useState } from "react";
import { editComment } from "../utils/api";
import { InputText } from "./InputText";
import { Button, Alert } from "@mui/material";
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
      {errorMsg ? <Alert severity="error">{errorMsg}</Alert> : null}
      <form onSubmit={editCommentOnSubmit}>
        <InputText
          labeling={"body"}
          val={bodyInput}
          onChangeFun={setBodyInput}
        />
        <div>
          <Button variant="contained" type="submit">
            Edit Comment
          </Button>
          <Button
            type="button"
            className="cancel"
            variant="contained"
            onClick={() => {
              setToggleComment(true);
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};
