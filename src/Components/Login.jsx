import React from "react";
import { useState } from "react";
import { fetchUserByUsername } from "../Utils/api";
import { useNavigate } from "react-router-dom";

export const Login = ({ setUser }) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const loginSubmit = (event) => {
    event.preventDefault();
    fetchUserByUsername(usernameInput)
      .then(({ user }) => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        setErrorMsg("");
        navigate("/dashboard");
      })
      .catch((err) => {
        setErrorMsg(err.response.data.msg);
      });
  };
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={loginSubmit}>
        <input
          placeholder="username"
          onChange={(event) => {
            setUsernameInput(event.target.value);
          }}
          value={usernameInput}
        ></input>
        <button type="submit">Login</button>
      </form>
      {errorMsg ? <p>{errorMsg}</p> : null}
    </>
  );
};
