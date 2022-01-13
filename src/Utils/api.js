import axios from "axios";

const myApi = axios.create({
  baseURL: "https://nc-news-api-app.herokuapp.com/api",
});

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
