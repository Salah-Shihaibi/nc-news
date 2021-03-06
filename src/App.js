import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Nav } from "./Components/Nav";
import { Login } from "./Components/Login";
import { Dashboard } from "./Components/Dashboard";
import { Articles } from "./Components/Articles";
import { ErrorPage } from "./Components/ErrorPage";
import { ArticlePage } from "./Components/ArticlePage";
import { useContext } from "react";
import { LoggedIn } from "./contexts/LoggedIn";
import { AddArticle } from "./Components/AddArticle";
import { EditArticle } from "./Components/EditArticle";
import { AddTopic } from "./Components/AddTopic";
import { ProfilePage } from "./Components/ProfilePage";
import { EditUser } from "./Components/EditUser";
import { Register } from "./Components/Register";

function App() {
  let { user, compareUserAndToken } = useContext(LoggedIn);
  user = Object.keys(user).length === 0 ? null : user;
  useEffect(() => {
    if (compareUserAndToken()) {
      localStorage.setItem("user", JSON.stringify({}));
      localStorage.setItem("token", JSON.stringify(""));
    }
  }, [compareUserAndToken]);

  return (
    <BrowserRouter>
      <div className="App">
        <Nav user={user} />
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route
            path="/register"
            element={user ? <Navigate to="/dashboard" /> : <Register />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile/:username"
            element={user ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route path="/articles/:article_id" element={<ArticlePage />} />
          <Route
            path="/post/article"
            element={user ? <AddArticle /> : <Navigate to="/login" />}
          />
          <Route
            path="/post/topic"
            element={user ? <AddTopic /> : <Navigate to="/login" />}
          />

          <Route
            path="/edit/articles/:article_id"
            element={user ? <EditArticle /> : <Navigate to="/login" />}
          />
          <Route
            path="/edit/user"
            element={user ? <EditUser /> : <Navigate to="/login" />}
          />
          <Route path="/error" element={<ErrorPage />} />
          <Route
            path="*"
            element={<ErrorPage msg="Page not found" status={404} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
