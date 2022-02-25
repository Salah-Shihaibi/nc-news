import { useState } from "react";
import { login } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoggedIn } from "../contexts/LoggedIn";
import styles from "../style/Login.module.css";
import { Button, Alert, Avatar } from "@mui/material";
import InputIcon from "@mui/icons-material/Input";
import LoginIcon from "@mui/icons-material/Login";
import { InputText } from "./InputText";
import { PasswordInput } from "./PasswordInput";
import { GoogleAuth } from "./GoogleAuth";

export const Login = () => {
  const { setUser } = useContext(LoggedIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const loginSubmit = (event) => {
    event.preventDefault();
    login({ email, password })
      .then((user) => {
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
    <div className="container_global">
      <Avatar
        className={styles.header}
        sx={{ width: 56, height: 56, bgcolor: "success.main" }}
      >
        <InputIcon></InputIcon>
      </Avatar>
      <p className="title mb-5">Login</p>
      {errorMsg ? <Alert severity="error">{errorMsg}</Alert> : null}
      <form className="form_global" onSubmit={loginSubmit}>
        <InputText labeling={"Email"} val={email} onChangeFun={setEmail} />
        <PasswordInput
          password={password}
          setPassword={setPassword}
          label={"password"}
          defaultText={"Password"}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ width: "175px", height: "45px", mb: "-20px" }}
          startIcon={<LoginIcon style={{ marginLeft: "-50px" }} />}
        >
          Login
        </Button>
      </form>
      <GoogleAuth setErrorMsg={setErrorMsg} text={"Login with Google"} />
      <p>
        New User? <Link to="/register"> Create an account</Link>
      </p>
    </div>
  );
};
