import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { LoggedIn } from "../contexts/LoggedIn";
import styles from "../style/Nav.module.css";
import { Avatar } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export const Nav = () => {
  let { user } = useContext(LoggedIn);
  user = Object.keys(user).length === 0 ? null : user;
  const [navToggle, setNavToggle] = useState(false);
  const toggle = () => {
    setNavToggle((currNavToggle) => !currNavToggle);
  };

  return (
    <>
      <nav className={styles.nav}>
        <Link to="/" className={`link ${styles.logo}`}>
          <img
            className={styles.image}
            src={require("../images/logo.png")}
            alt="logo"
          />{" "}
          <div>NC News</div>
        </Link>

        <div className={styles.avatar} onClick={toggle}>
          {user ? (
            <img
              className={styles.image}
              src={user.avatar_url}
              alt={user.username}
            />
          ) : (
            <Avatar
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="no user"
            />
          )}
          <KeyboardArrowDownIcon className={styles.arrow} />
        </div>
      </nav>
      {navToggle ? (
        <div onClick={toggle} className={styles.link_container}>
          <div className={styles.links}>
            {user ? (
              <>
                <Link to="/dashboard" className={styles.link}>
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className={styles.link}>
                  Login
                </Link>
              </>
            )}
            <Link to="/" className={styles.link}>
              Home
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
};
