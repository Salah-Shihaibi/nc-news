import axios from "axios";

const myApi = axios.create({
  baseURL: "https://nc-news-api-app.herokuapp.com/api",
});

export const fetchUserByUsername = (username) => {
  return myApi.get(`/users/${username}`).then((res) => {
    return res.data;
  });
};
