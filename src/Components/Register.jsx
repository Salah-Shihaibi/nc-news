import { useState } from "react";
import { register } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoggedIn } from "../contexts/LoggedIn";
import styles from "../style/Login.module.css";
import { Button, Alert, Avatar } from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { InputText } from "./InputText";
import { PasswordInput } from "./PasswordInput";
import { GoogleAuth } from "./GoogleAuth";

export const Register = () => {
  const { setUser } = useContext(LoggedIn);
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    password: "",
    password2: "",
    name: "",
    username: "",
    avatar_url: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  });
  const changeInfo = (value, key) => {
    setRegisterInfo((currInfo) => ({ ...currInfo, [key]: value }));
  };
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const registerSubmit = (event) => {
    event.preventDefault();
    if (registerInfo.password !== registerInfo.password2)
      setErrorMsg("Passwords do not match");
    else {
      register(registerInfo)
        .then((user) => {
          localStorage.setItem("user", JSON.stringify(user));
          setErrorMsg("");
          setUser(user);
          navigate("/dashboard");
        })
        .catch((err) => {
          setErrorMsg(err.response.data.msg);
        });
    }
  };

  return (
    <div className="container_global">
      <Avatar
        className={styles.header}
        sx={{ width: 56, height: 56, bgcolor: "success.main" }}
      >
        <AppRegistrationIcon></AppRegistrationIcon>
      </Avatar>
      <p className="title mb-5">Register</p>
      {errorMsg ? <Alert severity="error">{errorMsg}</Alert> : null}
      <form className="form_global" onSubmit={registerSubmit}>
        <InputText
          labeling={"Username"}
          val={registerInfo.username}
          onChangeFun={changeInfo}
        />
        <InputText
          labeling={"Name"}
          val={registerInfo.name}
          onChangeFun={changeInfo}
        />
        <InputText
          labeling={"Email"}
          val={registerInfo.email}
          onChangeFun={changeInfo}
        />
        <PasswordInput
          password={registerInfo.password}
          setPassword={changeInfo}
          label={"password"}
          defaultText={"Password"}
        />
        <PasswordInput
          password={registerInfo.password2}
          setPassword={changeInfo}
          label={"password2"}
          defaultText={"Repeat Password"}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ width: "192px", height: "45px", mb: "-5px" }}
        >
          Register
        </Button>
      </form>
      <GoogleAuth setErrorMsg={setErrorMsg} text={"Register with Google"} />
      <p>
        Already registered? <Link to="/login"> Login</Link>
      </p>
    </div>
  );
};
