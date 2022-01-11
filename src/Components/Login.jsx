import React from "react";
import { useState } from "react";
import { fetchUserByUsername } from "../Utils/api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoggedIn } from "../contexts/LoggedIn";

export const Login = () => {
  const { setUser } = useContext(LoggedIn);
  const [usernameInput, setUsernameInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const loginSubmit = (event) => {
    event.preventDefault();
    fetchUserByUsername(usernameInput)
      .then(({ user }) => {
        localStorage.setItem("user", JSON.stringify(user));
        setErrorMsg("");
        setUser(user);
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
          name="username"
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
