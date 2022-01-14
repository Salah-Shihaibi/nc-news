import { useState, useEffect } from "react";
import { Articles } from "./Articles";
import { fetchUserByUsername } from "../Utils/api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "../Utils/errorHandler";

import styles from "../style/Dashboard.module.css";
export const ProfilePage = () => {
  let navigate = useNavigate();
  const { username } = useParams();
  const [profile, setProfile] = useState({});
  useEffect(() => {
    fetchUserByUsername(username)
      .then(({ user }) => {
        setProfile(user);
      })
      .catch((err) => errorHandler(err, navigate));
  }, [navigate, username]);
  return (
    <>
      <div className={styles.profile}>
        <img
          src={profile.avatar_url}
          alt={profile.username}
          className={styles.image}
        />
        <span className={styles.name}>{profile.name}</span>
        <span className={styles.username}>{profile.username}</span>
      </div>

      <Articles
        author={`&author=${username}`}
        userLikedArticles={`&userLikedArticles=${username}`}
      />
    </>
  );
};
