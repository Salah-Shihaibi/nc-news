import { useState, useEffect } from "react";
import { editArticle, fetchArticleById } from "../Utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { LoggedIn } from "../contexts/LoggedIn";
import { errorHandler } from "../Utils/errorHandler";

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
      <>
        <h1>Edit Article</h1>
        {errorMsg ? <p>{errorMsg}</p> : null}
        <form onSubmit={editArticleOnSubmit}>
          <textarea
            placeholder="description"
            onChange={(event) => {
              setBodyInput(event.target.value);
            }}
            value={bodyInput}
          />
          <button type="submit">Edit Article</button>
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </button>
        </form>
      </>
    );
  } else if (!article.body) {
    return (
      <>
        <h2>Loading</h2>
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
