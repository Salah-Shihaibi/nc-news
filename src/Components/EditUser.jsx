import { useState } from "react";
import { editUser } from "../utils/api";
import { useContext } from "react";
import { LoggedIn } from "../contexts/LoggedIn";
//import styles from "../style/EditUser.module.css";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Button, Avatar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { InputText } from "./InputText";

export const EditUser = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(LoggedIn);
  const [userInputs, setUserInputs] = useState({
    name: user.name,
    avatar_url: user.avatar_url,
  });
  const [errorMsg, setErrorMsg] = useState("");

  const changeUser = (value, key) => {
    setUserInputs((currUser) => ({ ...currUser, [key]: value }));
  };

  const editUserOnSubmit = (event) => {
    event.preventDefault();
    if (Object.entries(userInputs).find((value) => value[1] === "")) {
      setErrorMsg("Please fill in all the fields");
      return null;
    }
    setUser((currUser) => {
      return { ...currUser, ...userInputs };
    });
    navigate(-1);
    editUser(user.username, userInputs)
      .then(({ user }) => {
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((err) => {
        setErrorMsg(err.response.data.msg);
      });
  };

  return (
    <div className="container_global">
      <Avatar sx={{ width: 56, height: 56, m: 1, bgcolor: "success.main" }}>
        <EditRoundedIcon></EditRoundedIcon>
      </Avatar>
      <p className="title">Edit Profile</p>
      {errorMsg ? <Alert severity="error">{errorMsg}</Alert> : null}
      <form onSubmit={editUserOnSubmit} className="form_global">
        <InputText
          labeling={"name"}
          val={userInputs.name}
          onChangeFun={changeUser}
        />

        <InputText
          labeling={"image_url"}
          val={userInputs.avatar_url}
          onChangeFun={changeUser}
        />
        <div>
          <Button type="submit" variant="contained">
            Edit profile
          </Button>
          <Button
            type="Button"
            variant="contained"
            className="cancel"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
