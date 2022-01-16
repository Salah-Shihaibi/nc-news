import { useState, useEffect } from "react";
import { Articles } from "./Articles";
import { fetchUserByUsername } from "../utils/api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "../utils/errorHandler";
import { Loading } from "./Loading";

import styles from "../style/Dashboard.module.css";
export const ProfilePage = () => {
  let navigate = useNavigate();
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({});
  useEffect(() => {
    fetchUserByUsername(username)
      .then(({ user }) => {
        setProfile(user);
        setIsLoading(false);
      })
      .catch((err) => errorHandler(err, navigate));
  }, [navigate, username]);
  if (!isLoading) {
    return (
      <>
        <div className={`${styles.profile}`}>
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
          popupTopMargin={"-152px"}
        />
      </>
    );
  } else {
    return <Loading />;
  }
};
