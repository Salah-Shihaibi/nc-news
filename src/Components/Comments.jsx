import { fetchComments, removeComment } from "../Utils/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "../Utils/errorHandler";
import { CommentCard } from "./CommentCard";
import { AddComment } from "./AddComment";

export const Comments = ({ article_id }) => {
  let navigate = useNavigate();
  const [allComments, setAllComments] = useState([]);
  useEffect(() => {
    fetchComments(article_id)
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
    </>
  );
};
