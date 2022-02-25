import axios from "axios";
import jwt_decode from "jwt-decode";

function getStorageValue(key, defaultValue) {
  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved);
  return initial || defaultValue;
}

const myApi = axios.create({
  baseURL: "https://nc-news-api-app.herokuapp.com/api",
});

myApi.interceptors.request.use((config) => {
  config.headers["x-auth-token"] = getStorageValue("token", "");
  return config;
});

export const register = (body) => {
  return myApi.post(`/auth/register`, body).then((res) => {
    localStorage.setItem("token", JSON.stringify(res.data.token));
    return jwt_decode(res.data.token);
  });
};

export const login = (body) => {
  return myApi.post(`/auth/login`, body).then((res) => {
    localStorage.setItem("token", JSON.stringify(res.data.token));
    return jwt_decode(res.data.token);
  });
};

export const googleAuth = (body) => {
  return myApi.post(`/auth/google`, body).then((res) => {
    localStorage.setItem("token", JSON.stringify(res.data.token));
    return jwt_decode(res.data.token);
  });
};

export const postImage = (body) => {
  return myApi.post(`/media`, body).then((res) => {
    return res.data;
  });
};

export const removeImage = ({ publicKey, folder }) => {
  return myApi.delete(`/media/${folder}/${publicKey}`);
};

export const fetchUserByUsername = (username) => {
  return myApi.get(`/users/${username}`).then((res) => {
    return res.data;
  });
};

export const fetchArticles = (queries) => {
  return myApi.get(`/articles?${queries}`).then((res) => {
    return res.data;
  });
};

export const fetchArticleById = (articles_id) => {
  return myApi.get(`/articles/${articles_id}`).then((res) => {
    return res.data;
  });
};

export const fetchComments = (article_id, queries) => {
  return myApi
    .get(`/articles/${article_id}/comments?${queries}`)
    .then((res) => {
      return res.data;
    });
};

export const removeArticle = (article_id) => {
  return myApi.delete(`/articles/${article_id}`).then(() => {});
};

export const postArticle = (body) => {
  return myApi.post(`/articles`, body).then((res) => {
    return res.data;
  });
};

export const fetchTopics = () => {
  return myApi.get(`/topics`).then((res) => {
    return res.data;
  });
};

export const postComment = (article_id, body) => {
  return myApi.post(`/articles/${article_id}/comments`, body).then((res) => {
    return res.data;
  });
};

export const removeComment = (comment_id) => {
  return myApi.delete(`/comments/${comment_id}`).then(() => {});
};

export const editArticle = (article_id, body) => {
  return myApi.patch(`/articles/${article_id}`, body).then((res) => {
    return res.data;
  });
};

export const editComment = (comment_id, body) => {
  return myApi.patch(`comments/${comment_id}`, body).then((res) => {
    return res.data;
  });
};

export const editUser = (username, body) => {
  return myApi.patch(`users/${username}`, body).then((res) => {
    return res.data;
  });
};

export const postTopic = (body) => {
  return myApi.post(`/topics`, body).then((res) => {
    return res.data;
  });
};

export const fetchUserVotedArticles = (username) => {
  return myApi.get(`/articles/votes/${username}`).then((res) => {
    return res.data;
  });
};

export const postUserVotedArticle = (body) => {
  return myApi.post(`/articles/votes`, body).then((res) => {
    return res.data;
  });
};

export const removeUserVotedArticle = (username, article_id) => {
  return myApi
    .delete(`/articles/votes/${username}/${article_id}`)
    .then(() => {});
};

export const editUserVotedArticle = (username, article_id, body) => {
  return myApi
    .patch(`/articles/votes/${username}/${article_id}`, body)
    .then((res) => {
      return res.data;
    });
};

export const fetchUserVotedComment = (username) => {
  return myApi.get(`/comments/votes/${username}`).then((res) => {
    return res.data;
  });
};

export const postUserVotedComment = (body) => {
  return myApi.post(`/comments/votes`, body).then((res) => {
    return res.data;
  });
};

export const removeUserVotedComment = (username, comment_id) => {
  return myApi
    .delete(`/comments/votes/${username}/${comment_id}`)
    .then(() => {});
};

export const editUserVotedComment = (username, comment_id, body) => {
  return myApi
    .patch(`/comments/votes/${username}/${comment_id}`, body)
    .then((res) => {
      return res.data;
    });
};
