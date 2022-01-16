import { useState } from "react";
import { postComment } from "../utils/api";
import { useContext } from "react";
import { LoggedIn } from "../contexts/LoggedIn";
import { InputText } from "./InputText";
import { Button, Alert } from "@mui/material";

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
        changeComment("", "body");
      })
      .catch((err) => {
        setErrorMsg(err.response.data.msg);
      });
  };

  if (Object.keys(user).length > 0) {
    return (
      <div className="gray_border input_comment">
        <p className="small_text text_margin">
          Comment as <span className="blue">{user.username}</span>
        </p>
        {errorMsg ? <Alert severity="error">{errorMsg}</Alert> : null}
        <form onSubmit={postCommentOnSubmit}>
          <InputText
            labeling={"body"}
            val={commentInputs.body}
            onChangeFun={changeComment}
            initialText="Add a comment"
          />
          <div className="flex_end">
            <Button
              type="submit"
              variant="contained"
              size="small"
              sx={{
                borderRadius: "20px",
              }}
            >
              Add Comment
            </Button>
          </div>
        </form>
      </div>
    );
  } else {
    return <></>;
  }
};
