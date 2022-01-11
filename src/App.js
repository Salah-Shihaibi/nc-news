import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Nav } from "./Components/Nav";
import { Login } from "./Components/Login";
import { Dashboard } from "./Components/Dashboard";
import { Articles } from "./Components/Articles";
import { ErrorPage } from "./Components/ErrorPage";
import { ArticlePage } from "./Components/ArticlePage";
import { useContext } from "react";
import { LoggedIn } from "./contexts/LoggedIn";
import { AddArticle } from "./Components/AddArticle";

function App() {
  const { user } = useContext(LoggedIn);

  return (
    <BrowserRouter>
      <div className="App">
        <Nav user={user} />
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="/articles/:article_id" element={<ArticlePage />} />
          <Route
            path="/post/article"
            element={user ? <AddArticle /> : <Navigate to="/login" />}
          />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
