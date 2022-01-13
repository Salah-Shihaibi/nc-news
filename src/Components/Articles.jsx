import { fetchArticles, removeArticle } from "../Utils/api";
import { useState, useEffect } from "react";
import { ArticleCard } from "./ArticleCard";
import { useNavigate, Link } from "react-router-dom";
import { errorHandler } from "../Utils/errorHandler";
import { Search } from "./Search";
import { SortFilter } from "./SortFilter";
import { Topics } from "./Topics";
import { InfiniteScroll } from "./InfiniteScroll";
const LIMIT = 10;

export const Articles = () => {
  let navigate = useNavigate();
  const [allArticles, setAllArticles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [lastTenMins, setLastTenMins] = useState("");
  const [topic, setTopic] = useState("");
  const [selectTopic, setSelectTopic] = useState(false);
  const [page, setPage] = useState(2);

  useEffect(() => {
    fetchArticles(
      `lastTenMins=${lastTenMins}&limit=${LIMIT}&order=${order}&sort_by=${sortBy}&search=${search}&${topic}`
    )
      .then(({ articles, total_count }) => {
        setAllArticles(articles);
        setTotalCount(Number(total_count));
      })
      .catch((err) => errorHandler(err, navigate));
  }, [lastTenMins, navigate, order, search, sortBy, topic]);

  const deleteArticle = (article_id) => {
    setAllArticles((currArticles) => {
      return currArticles.filter(
        (article) => article.article_id !== article_id
      );
    });
    removeArticle(article_id).catch((err) => errorHandler(err, navigate));
  };

  const incArticles = () => {
    fetchArticles(
      `p=${page}&lastTenMins=${lastTenMins}&limit=${LIMIT}&order=${order}&sort_by=${sortBy}&search=${search}&${topic}`
    )
      .then(({ articles }) => {
        setAllArticles((currArticles) => [...currArticles, ...articles]);
        setPage((currPage) => currPage + 1);
      })
      .catch((err) => errorHandler(err, navigate));
  };

  return (
    <div className="article_page">
      <button
        onClick={() => {
          setSelectTopic(true);
        }}
      >
        Select topic
      </button>
      {selectTopic ? (
        <Topics setTopic={setTopic} setSelectTopic={setSelectTopic} />
      ) : null}
      <Search setSearch={setSearch} />
      <SortFilter
        setSortBy={setSortBy}
        setOrder={setOrder}
        sortBy={sortBy}
        lastTenMins={lastTenMins}
        setLastTenMins={setLastTenMins}
      />
      <Link to="/post/article">Post article</Link>
      <Link to="/post/topic">Post topic</Link>

      <p>{totalCount} articles</p>
      <div className="articles">
        {allArticles.map((article) => {
          return (
            <ArticleCard
              key={article.article_id}
              article={article}
              deleteArticle={deleteArticle}
              setTopic={setTopic}
            />
          );
        })}
      </div>
      <InfiniteScroll
        totalCount={totalCount}
        LIMIT={LIMIT}
        page={page}
        incLimit={incArticles}
      />
    </div>
  );
};
