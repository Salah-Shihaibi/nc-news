import { fetchArticleById, removeArticle } from "../utils/api";
import { useState, useEffect } from "react";
import { errorHandler } from "../utils/errorHandler";
import { timeSince } from "../utils/pastTime";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Comments } from "./Comments";
import { useContext } from "react";
import { LoggedIn } from "../contexts/LoggedIn";
import { useLike } from "../hooks/useLike";
import { editArticle } from "../utils/api";
import { VoteButton } from "./VoteButton";
import { Chip, Avatar } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { Popup } from "./Popup";
import { DeleteOption } from "./DeleteOption";
import { Loading } from "./Loading";

export const ArticlePage = () => {
  let navigate = useNavigate();
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [singleArticle, setSingleArticles] = useState({});
  const [deleting, setDeleting] = useState(false);
  const { vote, voting } = useLike(article_id, editArticle);
  const { user } = useContext(LoggedIn);
  const { title, topic, author, votes, created_at, comment_count, body } =
    singleArticle;

  useEffect(() => {
    fetchArticleById(article_id)
      .then(({ article }) => {
        setSingleArticles(article);
        setIsLoading(false);
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

  if (!isLoading) {
    return (
      <>
        {deleting ? (
          <Popup
            setShow={() => {
              setDeleting(false);
            }}
          >
            <DeleteOption
              setShow={() => {
                setDeleting(false);
              }}
              itemName={"this article"}
              deleteFunc={() => {
                deleteArticle(article_id);
              }}
            ></DeleteOption>
          </Popup>
        ) : null}
        <div className={`center bg_smoke full_height`}>
          <div className="article_page">
            <div>
              <span className="small_text">
                Posted by{" "}
                <Link
                  className="profile_link"
                  to={
                    user.username === author
                      ? "/dashboard"
                      : `/profile/${author}`
                  }
                >
                  {author}{" "}
                </Link>
                . {timeSince(created_at)} ago
              </span>
              <Chip
                className="mt-mobile-4"
                label={singleArticle.topic}
                color="primary"
                size="small"
                avatar={<Avatar>{topic[0].toUpperCase()}</Avatar>}
              />
            </div>

            <div className="">
              <p className="article_title">{title}</p>
              <p className="article_body">{body}</p>
            </div>

            <div className="wrap_global">
              <VoteButton
                voting={voting}
                totalVote={votes + vote}
                vote={vote}
              />
              <div className="comment_count">
                {comment_count} <ModeCommentIcon />
              </div>
              <div className="edit_delete">
                {author === user.username ? (
                  <>
                    <DeleteOutlineIcon
                      className="red point"
                      onClick={() => {
                        setDeleting(true);
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
              comment_count={Number(comment_count)}
            />
          </div>
        </div>
      </>
    );
  } else {
    return <Loading />;
  }
};
