import { fetchArticleById, removeArticle } from "../Utils/api";
import { useState, useEffect } from "react";
import { errorHandler } from "../Utils/errorHandler";
import { timeSince } from "../Utils/pastTime";
import { useNavigate, useParams } from "react-router-dom";
import { Comments } from "./Comments";
import { useContext } from "react";
import { LoggedIn } from "../contexts/LoggedIn";
import { useLike } from "../hooks/useLike";
import { editArticle } from "../Utils/api";
import { VoteButton } from "./VoteButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export const ArticlePage = () => {
  const { user } = useContext(LoggedIn);
  let navigate = useNavigate();
  const { article_id } = useParams();
  const [singleArticle, setSingleArticles] = useState({});
  const { vote, voting } = useLike(article_id, editArticle);

  useEffect(() => {
    fetchArticleById(article_id)
      .then(({ article }) => {
        setSingleArticles(article);
      })
      .catch((err) => errorHandler(err, navigate));
  }, [article_id, navigate]);

  const deleteArticle = (article_id) => {
    removeArticle(article_id)
      .then(() => {
        navigate("/");
      })
      .catch((err) => errorHandler(err, navigate));
  };

  return (
    <div className="article_card">
      <div>
        author:{singleArticle.author} <br />
        topic: {singleArticle.topic} <br />
        Title: {singleArticle.title} <br />
        <VoteButton voting={voting} />
        {singleArticle.votes + vote} Votes <br />
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

      <div className="edit_delete">
        {singleArticle.author === user.username ? (
          <>
            <DeleteOutlineIcon
              className="red point"
              onClick={() => {
                deleteArticle(article_id);
              }}
            />
            <EditOutlinedIcon
              className="blue point"
              onClick={() => navigate(`/edit/articles/${article_id}`)}
            />
          </>
        ) : null}
      </div>

      <h2>Comments</h2>
      <Comments
        article_id={article_id}
        comment_count={Number(singleArticle.comment_count)}
      />
    </div>
  );
};
