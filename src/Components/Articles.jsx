import { fetchArticles, removeArticle } from "../Utils/api";
import { useState, useEffect } from "react";
import { ArticleCard } from "./ArticleCard";
import { useNavigate, Link } from "react-router-dom";
import { errorHandler } from "../Utils/errorHandler";
import { Search } from "./Search";
import { SortFilter } from "./SortFilter";
import { Topics } from "./Topics";
import { InfiniteScroll } from "./InfiniteScroll";
import PostAddIcon from "@mui/icons-material/PostAdd";
import TopicIcon from "@mui/icons-material/Topic";
import { Popup } from "./Popup";
import { Chip } from "@mui/material";

const LIMIT = 10;

export const Articles = ({
  userLikedArticles = "",
  author = "",
  popupTopMargin = "",
}) => {
  const navigate = useNavigate();
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
      })
      .catch((err) => errorHandler(err, navigate));
  }, [lastTenMins, navigate, order, search, sortBy, topic, userArticles]);

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
    <div className="bg_smoke">
      {post ? (
        <Popup
          setShow={() => {
            setPost(false);
          }}
          popupTopMargin={popupTopMargin}
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
        <Topics
          setTopic={setTopic}
          setSelectTopic={setSelectTopic}
          popupTopMargin={popupTopMargin}
        />
      ) : null}
      {!(selectTopic || post) ? (
        <>
          <div className="articles">
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
                label={"10 Mins"}
                onClick={() => {
                  setLastTenMins((currLastTenMins) => {
                    return currLastTenMins ? "" : "true";
                  });
                }}
                color={lastTenMins ? "secondary" : "primary"}
                size="small"
                clickable
              />
            </div>
          </div>

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
      ) : null}
    </div>
  );
};
