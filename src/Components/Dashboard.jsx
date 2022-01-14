import { useState, useContext } from "react";
import { LoggedIn } from "../contexts/LoggedIn";
import { EditUser } from "./EditUser";
import { Button } from "@mui/material";
import { Articles } from "./Articles";
import styles from "../style/Dashboard.module.css";

export const Dashboard = () => {
  const { user, logout, setUser } = useContext(LoggedIn);
  const [toggleUser, setToggleUser] = useState(true);

  if (user && toggleUser) {
    return (
      <>
        <div className={styles.profile}>
          <img
            src={user.avatar_url}
            alt={user.username}
            className={styles.image}
          />
          <span className={styles.name}>{user.name}</span>
          <span className={styles.username}>{user.username}</span>
          <div>
            <Button
              className={styles.logout}
              type="submit"
              variant="contained"
              onClick={() => {
                logout(setUser);
              }}
            >
              Logout
            </Button>
            <Button
              className={styles.edit_user}
              type="submit"
              variant="contained"
              onClick={() => {
                setToggleUser(false);
              }}
            >
              Update User
            </Button>
          </div>
        </div>

        <Articles
          author={`&author=${user.username}`}
          userLikedArticles={`&userLikedArticles=${user.username}`}
        />
      </>
    );
  } else {
    return (
      <>
        <EditUser setToggleUser={setToggleUser} />
      </>
    );
  }
};
