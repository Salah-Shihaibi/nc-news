import { fetchArticles, removeArticle } from "../utils/api";
import { useState, useEffect } from "react";
import { ArticleCard } from "./ArticleCard";
import { useNavigate, Link } from "react-router-dom";
import { errorHandler } from "../utils/errorHandler";
import { Search } from "./Search";
import { SortFilter } from "./SortFilter";
import { Topics } from "./Topics";
import { InfiniteScroll } from "./InfiniteScroll";
import PostAddIcon from "@mui/icons-material/PostAdd";
import TopicIcon from "@mui/icons-material/Topic";
import { Popup } from "./Popup";
import { Chip } from "@mui/material";
import { Loading } from "./Loading";

const LIMIT = 10;

export const Articles = ({ userLikedArticles = "", author = "" }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [allArticles, setAllArticles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [lastTenMins, setLastTenMins] = useState("");
  const [topic, setTopic] = useState("");
  const [selectTopic, setSelectTopic] = useState(false);
  const [userArticles, setUserArticles] = useState(author);
  const [page, setPage] = useState(2);
  const [post, setPost] = useState(false);
  useEffect(() => {
    fetchArticles(
      `lastTenMins=${lastTenMins}&limit=${LIMIT}&order=${order}&sort_by=${sortBy}&search=${search}${topic}${userArticles}`
    )
      .then(({ articles, total_count }) => {
        setAllArticles(articles);
        setTotalCount(Number(total_count));
        setIsLoading(false);
      })
      .catch((err) => errorHandler(err, navigate));
  }, [lastTenMins, navigate, order, search, sortBy, topic, userArticles]);

  const resetStates = () => {
    setSortBy("created_at");
    setOrder("desc");
    setSearch("");
    setLastTenMins("");
    setTopic("");
    setUserArticles(author);
    setPage(2);
  };
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

  if (!isLoading) {
    return (
      <div className="bg_smoke full_height">
        {post ? (
          <Popup
            setShow={() => {
              setPost(false);
            }}
          >
            <div className="wrap_global center">
              <Link className="post" to="/post/article">
                Post article
              </Link>
              <Link className="post" to="/post/topic">
                Post topic
              </Link>
            </div>
          </Popup>
        ) : null}

        {selectTopic ? (
          <Topics setTopic={setTopic} setSelectTopic={setSelectTopic} />
        ) : null}

        <>
          <div className={`articles`}>
            <nav className="filter_nav">
              <div>
                <Chip
                  className="mr-2 p-2"
                  icon={<TopicIcon />}
                  label={"Topic"}
                  onClick={() => {
                    setSelectTopic(true);
                  }}
                  variant="outlined"
                  clickable
                />

                <Chip
                  className=" p-2"
                  icon={<PostAddIcon />}
                  label={"Post"}
                  onClick={() => {
                    setPost(true);
                  }}
                  variant="outlined"
                  clickable
                />
              </div>

              <Search setSearch={setSearch} display={"pc"} />
              <SortFilter
                userLikedArticles={userLikedArticles}
                author={author}
                setUserArticles={setUserArticles}
                userArticles={userArticles}
                setSortBy={setSortBy}
                order={order}
                setOrder={setOrder}
                sortBy={sortBy}
                lastTenMins={lastTenMins}
                setLastTenMins={setLastTenMins}
              />
            </nav>

            <Search setSearch={setSearch} display={"mobile_search"} />

            <div className="articles_count">
              <p>{totalCount} articles</p>

              <Chip
                label={"Last 10 minutes"}
                onClick={() => {
                  setLastTenMins((currLastTenMins) => {
                    return currLastTenMins ? "" : "true";
                  });
                }}
                sx={{
                  backgroundColor: lastTenMins ? "#808080" : "#1976d2",
                  color: "white",
                }}
                size="small"
                clickable
              />

              <Chip
                label={"Refresh articles"}
                onClick={resetStates}
                sx={{
                  backgroundColor: "#1976d2",
                  color: "white",
                }}
                size="small"
                clickable
              />
            </div>
          </div>
          {allArticles.length ? null : (
            <p className="article_not_found article_body">
              No article found try other filters or search keywords
            </p>
          )}
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
        </>
      </div>
    );
  } else {
    return <Loading />;
  }
};
