import { timeSince } from "../Utils/pastTime";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoggedIn } from "../contexts/LoggedIn";
import { useNavigate } from "react-router-dom";
import { editArticle } from "../Utils/api";
import { useLike } from "../hooks/useLike";
import { VoteButton } from "./VoteButton";
import { Chip, Avatar } from "@mui/material";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export const ArticleCard = ({ article, deleteArticle, setTopic }) => {
  const { user } = useContext(LoggedIn);
  const { title, topic, author, votes, created_at, comment_count, article_id } =
    article;
  const navigate = useNavigate();

  const { vote, voting } = useLike(article_id, editArticle);
  return (
    <div className="article_card">
      <div>
        <span className="small_text">
          Posted by {author} . {timeSince(created_at)} ago
        </span>
        <Chip
          label={topic}
          color="primary"
          size="small"
          avatar={<Avatar>{topic[0].toUpperCase()}</Avatar>}
          onClick={() => {
            setTopic(`topic=${topic}`);
          }}
        />
      </div>
      <Link to={`/articles/${article_id}`} className="link">
        <p className="article_title">{title}</p>
        <p className="small_text blue">Continue reading...</p>
      </Link>
      <div className="wrap_global">
        <VoteButton voting={voting} totalVote={votes + vote} vote={vote} />
        <div className="comment_count">
          {comment_count} <ModeCommentIcon />
        </div>
        <div className="edit_delete">
          {author === user.username ? (
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
    </div>
  );
};
