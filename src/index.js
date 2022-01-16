import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StrictMode, useState, useEffect } from "react";
import { LoggedIn } from "./contexts/LoggedIn";
import { TopicsList } from "./contexts/Topics";
import { fetchTopics } from "./utils/api";

function getStorageValue(key, defaultValue) {
  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved);
  return initial || defaultValue;
}

function Index() {
  const [user, setUser] = useState(() => {
    return getStorageValue("user", {});
  });

  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopics().then((topicsResult) => {
      setTopics(topicsResult.topics);
    });
  }, []);

  const logout = (setUser) => {
    localStorage.setItem("user", JSON.stringify({}));
    setUser({});
  };
  return (
    <>
      <LoggedIn.Provider value={{ user, setUser, logout }}>
        <TopicsList.Provider value={{ topics, setTopics }}>
          <App />
        </TopicsList.Provider>
      </LoggedIn.Provider>
    </>
  );
}

ReactDOM.render(
  <StrictMode>
    <Index />
  </StrictMode>,
  document.getElementById("root")
);
