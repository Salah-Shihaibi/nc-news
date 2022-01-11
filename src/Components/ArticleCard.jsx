import { timeSince } from "../Utils/pastTime";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoggedIn } from "../contexts/LoggedIn";
import { useNavigate } from "react-router-dom";

export const ArticleCard = ({ article, deleteArticle }) => {
  const { user } = useContext(LoggedIn);
  const { title, topic, author, votes, created_at, comment_count, article_id } =
    article;
  const navigate = useNavigate();

  return (
    <>
      <Link to={`/articles/${article_id}`}>
        <div>
          author:{author} <br />
          topic: {topic} <br />
          Title: {title} <br />
          <button>like</button>
          <button>dislike</button>
          {votes} Votes <br />
          {comment_count} comments
          <p>Date: {timeSince(created_at)} ago</p>
        </div>
      </Link>
      {author === user.username ? (
        <>
          <button
            onClick={() => {
              deleteArticle(article_id);
            }}
          >
            Delete
          </button>
          <button onClick={() => navigate(`/edit/articles/${article_id}`)}>
            Edit
          </button>
        </>
      ) : null}
    </>
  );
};
