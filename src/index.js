import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import jwt_decode from "jwt-decode";
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
  const [token, setToken] = useState("");
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopics().then((topicsResult) => {
      setTopics(topicsResult.topics);
    });
  }, []);

  const logout = (setUser) => {
    localStorage.setItem("user", JSON.stringify({}));
    localStorage.setItem("token", JSON.stringify(""));
    setUser({});
  };

  const compareObj = (obj1, obj2) => {
    for (const keyVal in obj1) {
      if (obj1[keyVal] !== obj2[keyVal]) return false;
    }
    return true;
  };
  const compareUserAndToken = () => {
    const user = getStorageValue("user", false);
    const token = getStorageValue("token", false);
    if (!token || !user) return true;
    try {
      jwt_decode(token);
    } catch (err) {
      return true;
    }
    if (compareObj(jwt_decode(token), user)) return false;
    return true;
  };
  return (
    <>
      <LoggedIn.Provider
        value={{ user, setUser, token, setToken, compareUserAndToken, logout }}
      >
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
