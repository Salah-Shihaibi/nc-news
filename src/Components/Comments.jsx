import { fetchComments, removeComment } from "../Utils/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "../Utils/errorHandler";
import { CommentCard } from "./CommentCard";
import { AddComment } from "./AddComment";
import { InfiniteScroll } from "./InfiniteScroll";

const LIMIT = 10;

export const Comments = ({ article_id, comment_count }) => {
  let navigate = useNavigate();
  const [allComments, setAllComments] = useState([]);
  const [page, setPage] = useState(2);

  useEffect(() => {
    fetchComments(article_id, `limit=${LIMIT}`)
      .then(({ comments }) => {
        setAllComments(comments);
      })
      .catch((err) => errorHandler(err, navigate));
  }, [article_id, navigate]);

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
    fetchComments(article_id, `p=${page}&limit=${LIMIT}`)
      .then(({ comments }) => {
        setAllComments((currComments) => [...currComments, ...comments]);
        setPage((currPage) => currPage + 1);
      })
      .catch((err) => errorHandler(err, navigate));
  };

  return (
    <>
      <AddComment setAllComments={setAllComments} article_id={article_id} />
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
};
