import { useState } from "react";
import { postArticle } from "../Utils/api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoggedIn } from "../contexts/LoggedIn";
import { Topics } from "../contexts/Topics";

export const AddArticle = () => {
  const { user } = useContext(LoggedIn);
  const { topics } = useContext(Topics);
  const [articleInputs, setArticleInputs] = useState({
    title: "",
    topic: "",
    body: "",
    author: user.username,
  });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const changeArticle = (value, key) => {
    setArticleInputs((currArticle) => ({ ...currArticle, [key]: value }));
  };

  const postArticleOnSubmit = (event) => {
    event.preventDefault();
    if (Object.entries(articleInputs).find((value) => value[1] === "")) {
      setErrorMsg("Please fill in all the fields");
      return null;
    }
    postArticle(articleInputs)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setErrorMsg(err.response.data.msg);
      });
  };

  return (
    <>
      <h1>Add Article</h1>
      {errorMsg ? <p>{errorMsg}</p> : null}
      <form onSubmit={postArticleOnSubmit}>
        <input
          placeholder="title"
          onChange={(event) => {
            changeArticle(event.target.value, "title");
          }}
          value={articleInputs.title}
        ></input>

        <input
          placeholder="description"
          onChange={(event) => {
            changeArticle(event.target.value, "body");
          }}
          value={articleInputs.body}
        ></input>
        <select
          onChange={(event) => {
            changeArticle(event.target.value, "topic");
          }}
        >
          <option selected disabled hidden value="">
            Choose Category
          </option>
          {topics.map(({ slug }) => {
            return (
              <option key={slug} value={slug}>
                {slug}
              </option>
            );
          })}
        </select>

        <button type="submit">Add Article</button>
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
};
