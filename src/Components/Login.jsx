import { useState } from "react";
import { fetchUserByUsername } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoggedIn } from "../contexts/LoggedIn";
import styles from "../style/Login.module.css";
import { Button, Alert, Avatar } from "@mui/material";
import InputIcon from "@mui/icons-material/Input";
import { InputText } from "./InputText";

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
    <div className={styles.wrap}>
      <div className={styles.container}>
        <Avatar
          className={styles.header}
          sx={{ width: 56, height: 56, bgcolor: "success.main" }}
        >
          <InputIcon></InputIcon>
        </Avatar>
        <p className="title mb-5">Login</p>
        <form className={styles.form} onSubmit={loginSubmit}>
          <InputText
            labeling={"username"}
            val={usernameInput}
            onChangeFun={setUsernameInput}
            width="85%"
          />

          <Button type="submit" variant="contained">
            Login
          </Button>
        </form>

        {errorMsg ? <Alert severity="error">{errorMsg}</Alert> : null}
      </div>
    </div>
  );
};
