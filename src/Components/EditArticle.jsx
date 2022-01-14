import { useState, useEffect } from "react";
import { editArticle, fetchArticleById } from "../Utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { LoggedIn } from "../contexts/LoggedIn";
import { errorHandler } from "../Utils/errorHandler";
import { InputText } from "./InputText";
import { Button, Alert, Avatar } from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

export const EditArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const { user } = useContext(LoggedIn);
  const [bodyInput, setBodyInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticleById(article_id)
      .then(({ article }) => {
        setArticle(article);
        setBodyInput(article.body);
      })
      .catch((err) => errorHandler(err, navigate));
  }, [article_id, navigate]);

  const editArticleOnSubmit = (event) => {
    event.preventDefault();
    if (bodyInput === "") {
      setErrorMsg("Description is empty");
      return null;
    }
    editArticle(article_id, { edit_body: bodyInput })
      .then(() => {
        navigate(-1);
      })
      .catch((err) => {
        setErrorMsg(err.response.data.msg);
      });
  };

  if (user.username === article.author) {
    return (
      <div className="container_global">
        <Avatar sx={{ width: 56, height: 56, m: 1, bgcolor: "success.main" }}>
          <ModeEditOutlineIcon></ModeEditOutlineIcon>
        </Avatar>
        <p className="title">Edit Article</p>

        {errorMsg ? <Alert severity="error">{errorMsg}</Alert> : null}
        <form onSubmit={editArticleOnSubmit} className="form_global">
          <InputText
            labeling={"description"}
            val={bodyInput}
            onChangeFun={setBodyInput}
          />

          <div>
            <Button type="submit" variant="contained">
              Edit Article
            </Button>
            <Button
              variant="contained"
              className="cancel"
              type="button"
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    );
  } else if (!article.body) {
    return (
      <>
        <h2>Loading...</h2>
      </>
    );
  } else {
    return (
      <>
        {errorHandler(
          { response: { status: 401, data: { msg: "unauthorized user" } } },
          navigate
        )}
      </>
    );
  }
};
