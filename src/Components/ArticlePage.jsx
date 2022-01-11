import { fetchArticleById, removeArticle } from "../Utils/api";
import { useState, useEffect } from "react";
import { errorHandler } from "../Utils/errorHandler";
import { timeSince } from "../Utils/pastTime";
import { useNavigate, useParams } from "react-router-dom";
import { Comments } from "./Comments";
import { useContext } from "react";
import { LoggedIn } from "../contexts/LoggedIn";

export const ArticlePage = () => {
  const { user } = useContext(LoggedIn);
  let navigate = useNavigate();
  const { article_id } = useParams();
  const [singleArticle, setSingleArticles] = useState({});
  useEffect(() => {
    fetchArticleById(article_id)
      .then(({ article }) => {
        setSingleArticles(article);
      })
      .catch((err) => errorHandler(err, navigate));
  }, []);

  const deleteArticle = (article_id) => {
    removeArticle(article_id)
      .then(() => {
        navigate("/");
      })
      .catch((err) => errorHandler(err, navigate));
  };

  return (
    <>
      <div>
        author:{singleArticle.author} <br />
        topic: {singleArticle.topic} <br />
        Title: {singleArticle.title} <br />
        <button>like</button>
        <button>dislike</button>
        {singleArticle.votes} Votes <br />
        {singleArticle.comment_count} comments <br />
        Description: {singleArticle.body}
        <p>Date: {timeSince(singleArticle.created_at)} ago</p>
        {singleArticle.author === user.username ? (
          <>
            <button
              onClick={() => {
                deleteArticle(singleArticle.article_id);
              }}
            >
              Delete
            </button>
            <button onClick={() => navigate(`/edit/articles/${article_id}`)}>
              Edit
            </button>
          </>
        ) : null}
      </div>
      <Comments article_id={article_id} />
    </>
  );
};
