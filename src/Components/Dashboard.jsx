import { useContext } from "react";
import { LoggedIn } from "../contexts/LoggedIn";
import { Button } from "@mui/material";
import { Articles } from "./Articles";
import { Link } from "react-router-dom";
import styles from "../style/Dashboard.module.css";

export const Dashboard = () => {
  const { user, logout, setUser } = useContext(LoggedIn);

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
          <Link className="remove_link_style" to="/edit/user">
            <Button
              className={styles.edit_user}
              type="submit"
              variant="contained"
            >
              Update User
            </Button>
          </Link>
        </div>
      </div>

      <Articles
        author={`&author=${user.username}`}
        userLikedArticles={`&userLikedArticles=${user.username}`}
      />
    </>
  );
};
