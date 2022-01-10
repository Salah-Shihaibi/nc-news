import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Nav } from "./Components/Nav";
import { Login } from "./Components/Login";
import { Dashboard } from "./Components/Dashboard";
import { Articles } from "./Components/Articles";

function getStorageValue(key, defaultValue) {
  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved);
  return initial || defaultValue;
}

function App() {
  const [user, setUser] = useState(() => {
    return getStorageValue("user", null);
  });

  return (
    <BrowserRouter>
      <div className="App">
        <Nav user={user} />
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route
            path="/login"
            element={
              user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />
            }
          />
          <Route
            path="/dashboard"
            element={
              user ? (
                <Dashboard user={user} setUser={setUser} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
