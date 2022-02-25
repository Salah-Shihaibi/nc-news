import { useState } from "react";
import { editUser, postImage, removeImage } from "../utils/api";
import { useContext } from "react";
import { LoggedIn } from "../contexts/LoggedIn";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Button, Avatar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { InputText } from "./InputText";
import { UploadImage } from "./UploadImage";
import styles from "../style/Dashboard.module.css";

export const EditUser = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(LoggedIn);
  const preImage = user.avatar_url;
  const [userInputs, setUserInputs] = useState({
    name: user.name,
    avatar_url: user.avatar_url,
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [imageUrl, setImageUrl] = useState(user.avatar_url);
  const changeUser = (value, key) => {
    setUserInputs((currUser) => ({ ...currUser, [key]: value }));
  };

  const editUserOnSubmit = (event) => {
    event.preventDefault();
    if (Object.entries(userInputs).find((value) => value[1] === "")) {
      setErrorMsg("Please fill in all the fields");
      return null;
    }
    postImage({ fileStr: imageUrl, folder: "user" })
      .then(({ url }) => {
        return editUser(user.username, { userInputs, avatar_url: url });
      })
      .then(({ user }) => {
        setUser((currUser) => {
          return { ...currUser, ...user };
        });
        localStorage.setItem("user", JSON.stringify(user));
        const folder = preImage.split("/").at(-2);
        const publicKey = preImage.split("/").at(-1).split(".").at(-2);
        return removeImage({ publicKey, folder });
      })
      .then(() => {
        navigate(-1);
      })
      .catch((err) => {
        setErrorMsg(err.response.data.msg || err);
      });
  };

  return (
    <div className="container_global">
      <Avatar sx={{ width: 56, height: 56, m: 1, bgcolor: "success.main" }}>
        <EditRoundedIcon></EditRoundedIcon>
      </Avatar>
      <p className="title">Edit Profile</p>
      {errorMsg ? <Alert severity="error">{errorMsg}</Alert> : null}
      <img src={imageUrl} alt="profile" className={styles.image} />
      <form onSubmit={editUserOnSubmit} className="form_global">
        <InputText
          labeling={"name"}
          val={userInputs.name}
          onChangeFun={changeUser}
        />

        <UploadImage setImageUrl={setImageUrl} />

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
