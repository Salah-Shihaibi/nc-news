import {
  fetchUserVotedArticles,
  removeUserVotedArticle,
  postUserVotedArticle,
  editUserVotedArticle,
  editArticle,
} from "../utils/api";
import { timeSince } from "../utils/pastTime";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoggedIn } from "../contexts/LoggedIn";
import { useLike } from "../hooks/useLike";
import { VoteButton } from "./VoteButton";
import { Chip, Avatar } from "@mui/material";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import styles from "../style/ArticleCard.module.css";
import { EditDelete } from "./EditDelete";
import { DeletePopup } from "./DeletePopup";

export const ArticleCard = ({ article, deleteArticle, setTopic }) => {
  const { user } = useContext(LoggedIn);
  const { title, topic, author, votes, created_at, comment_count, article_id } =
    article;
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
  const [deleting, setDeleting] = useState(false);

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
      <div className={styles.article_card}>
        <div>
          <span className="small_text">
            Posted by{" "}
            <Link
              className="profile_link"
              to={
                user.username === author ? "/dashboard" : `/profile/${author}`
              }
            >
              {author}
            </Link>{" "}
            . {timeSince(created_at)} ago
          </span>
          <Chip
            className="mt-mobile-4"
            label={topic}
            color="primary"
            size="small"
            avatar={<Avatar>{topic[0].toUpperCase()}</Avatar>}
            onClick={() => {
              setTopic(`&topic=${topic}`);
            }}
          />
        </div>
        <Link to={`/articles/${article_id}`} className="link">
          <p className="article_title">{title}</p>
          <p className="small_text blue_color">Continue reading...</p>
        </Link>
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
      </div>
    </>
  );
};
