import { fetchComments, removeComment } from "../utils/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "../utils/errorHandler";
import { CommentCard } from "./CommentCard";
import { AddComment } from "./AddComment";
import { InfiniteScroll } from "./InfiniteScroll";
import { Loading } from "./Loading";
import { SortFilter } from "./SortFilter";

const LIMIT = 10;

export const Comments = ({ article_id, comment_count }) => {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [allComments, setAllComments] = useState([]);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(2);

  useEffect(() => {
    fetchComments(article_id, `limit=${LIMIT}&sort_by=${sortBy}&order=${order}`)
      .then(({ comments }) => {
        setAllComments(comments);
        setIsLoading(false);
      })
      .catch((err) => errorHandler(err, navigate));
  }, [article_id, navigate, order, sortBy]);

  const deleteComment = (comment_id) => {
    setAllComments((currComments) => {
      return currComments.filter(
        (comment) => comment.comment_id !== comment_id
      );
    });
    removeComment(comment_id).catch((err) => errorHandler(err, navigate));
  };

  const patchComment = (comment_id, body) => {
    setAllComments((currComment) => {
      return currComment.map((comment) => {
        if (comment.comment_id !== comment_id) return comment;
        return { ...comment, body };
      });
    });
  };

  const incComments = () => {
    fetchComments(
      article_id,
      `p=${page}&limit=${LIMIT}&sort_by=${sortBy}&order=${order}`
    )
      .then(({ comments }) => {
        setAllComments((currComments) => [...currComments, ...comments]);
        setPage((currPage) => currPage + 1);
      })
      .catch((err) => errorHandler(err, navigate));
  };

  if (!isLoading) {
    return (
      <>
        <AddComment setAllComments={setAllComments} article_id={article_id} />
        <SortFilter
          sortBy={sortBy}
          setSortBy={setSortBy}
          order={order}
          setOrder={setOrder}
          selectWidth={""}
        />
        <hr style={{ border: "0.5px solid whitesmoke", color: "whitesmoke" }} />
        {allComments.map((comment) => {
          return (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              deleteComment={deleteComment}
              patchComment={patchComment}
            />
          );
        })}
        <InfiniteScroll
          totalCount={comment_count}
          LIMIT={LIMIT}
          page={page}
          incLimit={incComments}
        />
      </>
    );
  } else {
    return <Loading />;
  }
};
