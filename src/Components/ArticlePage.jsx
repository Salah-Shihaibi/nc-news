import {
  fetchArticleById,
  fetchUserVotedArticles,
  removeArticle,
  removeUserVotedArticle,
  postUserVotedArticle,
  editUserVotedArticle,
  editArticle,
} from "../utils/api";
import { useState, useEffect } from "react";
import { errorHandler } from "../utils/errorHandler";
import { timeSince } from "../utils/pastTime";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Comments } from "./Comments";
import { useContext } from "react";
import { LoggedIn } from "../contexts/LoggedIn";
import { useLike } from "../hooks/useLike";
import { VoteButton } from "./VoteButton";
import { Chip, Avatar } from "@mui/material";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { Loading } from "./Loading";
import { EditDelete } from "./EditDelete";
import { DeletePopup } from "./DeletePopup";
import styles from "../style/ArticlePage.module.css";

export const ArticlePage = () => {
  let navigate = useNavigate();
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [singleArticle, setSingleArticles] = useState({});
  const [deleting, setDeleting] = useState(false);
  const { user } = useContext(LoggedIn);
  const { title, topic, author, votes, created_at, comment_count, body } =
    singleArticle;
  const { vote, voting, voteCounter } = useLike(
    article_id,
    editArticle,
    fetchUserVotedArticles,
    removeUserVotedArticle,
    postUserVotedArticle,
    editUserVotedArticle,
    "userLikedArticles",
    "article_id"
  );
  useEffect(() => {
    fetchArticleById(article_id)
      .then(({ article }) => {
        setSingleArticles(article);
        setIsLoading(false);
      })
      .catch((err) => errorHandler(err, navigate));
  }, [article_id, navigate, user.username]);

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
        <DeletePopup
          deleting={deleting}
          setDeleting={setDeleting}
          deleteFunc={() => {
            deleteArticle(article_id);
          }}
          itemName={"this article"}
        />
        <div className={`center bg_smoke full_height`}>
          <div className={styles.article_page}>
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
                totalVote={votes + voteCounter + vote}
                vote={vote}
              />
              <div className="ml-5 chip">
                {comment_count} <ModeCommentIcon />
              </div>
              <EditDelete
                author={author}
                url={`/edit/articles/${article_id}`}
                setDeleting={setDeleting}
              />
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
