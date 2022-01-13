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
import { Chip, Avatar } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ModeCommentIcon from "@mui/icons-material/ModeComment";

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

  if (singleArticle.body) {
    return (
      <div className="center bg_smoke">
        <div className="article_page">
          <div>
            <span className="small_text">
              Posted by {singleArticle.author} .{" "}
              {timeSince(singleArticle.created_at)} ago
            </span>
            <Chip
              label={singleArticle.topic}
              color="primary"
              size="small"
              avatar={<Avatar>{singleArticle.topic[0].toUpperCase()}</Avatar>}
            />
          </div>

          <div className="">
            <p className="article_title">{singleArticle.title}</p>
            <p className="article_body">{singleArticle.body}</p>
          </div>

          <div className="wrap_global">
            <VoteButton
              voting={voting}
              totalVote={singleArticle.votes + vote}
              vote={vote}
            />
            <div className="comment_count">
              {singleArticle.comment_count} <ModeCommentIcon />
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
          </div>
          <Comments
            article_id={article_id}
            comment_count={Number(singleArticle.comment_count)}
          />
        </div>
      </div>
    );
  } else {
    return (
      <>
        <h2>Loading...</h2>
      </>
    );
  }
};
