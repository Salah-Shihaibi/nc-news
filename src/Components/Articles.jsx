import { fetchArticles, removeArticle } from "../Utils/api";
import { useState, useEffect } from "react";
import { ArticleCard } from "./ArticleCard";
import { useNavigate, Link } from "react-router-dom";
import { errorHandler } from "../Utils/errorHandler";

export const Articles = () => {
  let navigate = useNavigate();
  const [allArticles, setAllArticles] = useState([]);
  const [totalCount, setTotalCount] = useState([]);
  useEffect(() => {
    fetchArticles()
      .then(({ articles, total_count }) => {
        setAllArticles(articles);
        setTotalCount(total_count);
      })
      .catch((err) => errorHandler(err, navigate));
  }, [navigate]);

  const deleteArticle = (article_id) => {
    setAllArticles((currArticles) => {
      return currArticles.filter(
        (article) => article.article_id !== article_id
      );
    });
    removeArticle(article_id).catch((err) => errorHandler(err, navigate));
  };

  return (
    <>
      <Link to="/post/article">Post article</Link>
      <p>{totalCount} articles</p>
      {allArticles.map((article) => {
        return (
          <ArticleCard
            key={article.article_id}
            article={article}
            deleteArticle={deleteArticle}
          />
        );
      })}
    </>
  );
};
