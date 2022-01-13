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
        <div className={styles.logo}>Logo</div>

        <div className={styles.avatar} onClick={toggle}>
          {user ? (
            <img
              className={styles.image}
              src={user.avatar_url}
              alt={user.avatar_url}
            />
          ) : (
            <Avatar
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="no user"
            />
          )}
          <KeyboardArrowDownIcon />
        </div>
      </nav>
      {navToggle ? (
        <div onClick={toggle} className={styles.link_container}>
          <div className={styles.links}>
            <Link to="/" className={styles.link}>
              Home
            </Link>
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
              Element
            </Link>
            <Link to="/" className={styles.link}>
              Element
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
};
