import { useState } from "react";
import { editUser } from "../Utils/api";
import { useContext } from "react";
import { LoggedIn } from "../contexts/LoggedIn";
//import styles from "../style/EditUser.module.css";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Button, TextField, Avatar, Alert } from "@mui/material";

export const EditUser = ({ setToggleUser }) => {
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
    setToggleUser(true);
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
        <TextField
          className="width100"
          onChange={(event) => {
            changeUser(event.target.value, "name");
          }}
          value={userInputs.name}
          margin="normal"
          required
          label="name"
          name="name"
          autoComplete="name"
          autoFocus
        />
        <TextField
          className="width100"
          onChange={(event) => {
            changeUser(event.target.value, "avatar_url");
          }}
          value={userInputs.avatar_url}
          margin="normal"
          required
          label="image_url"
          name="image_url"
          autoComplete="image_url"
          autoFocus
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
              setToggleUser(true);
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
