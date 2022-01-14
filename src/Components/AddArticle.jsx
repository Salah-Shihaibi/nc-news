import { useState } from "react";
import { postArticle } from "../Utils/api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoggedIn } from "../contexts/LoggedIn";
import { TopicsList } from "../contexts/Topics";
import PostAddIcon from "@mui/icons-material/PostAdd";
import {
  Button,
  Avatar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { InputText } from "./InputText";

export const AddArticle = () => {
  const { user } = useContext(LoggedIn);
  const { topics } = useContext(TopicsList);
  const [articleInputs, setArticleInputs] = useState({
    title: "",
    topic: "",
    body: "",
    author: user.username,
  });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const changeArticle = (value, key) => {
    setArticleInputs((currArticle) => ({ ...currArticle, [key]: value }));
  };

  const postArticleOnSubmit = (event) => {
    event.preventDefault();
    if (Object.entries(articleInputs).find((value) => value[1] === "")) {
      setErrorMsg("Please fill in all the fields");
      return null;
    }
    postArticle(articleInputs)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setErrorMsg(err.response.data.msg);
      });
  };

  return (
    <div className="container_global">
      <Avatar sx={{ width: 56, height: 56, m: 1, bgcolor: "primary.main" }}>
        <PostAddIcon size="large"></PostAddIcon>
      </Avatar>
      <p className="title">Add Article</p>
      {errorMsg ? <Alert severity="error">{errorMsg}</Alert> : null}
      <form onSubmit={postArticleOnSubmit} className="form_global">
        <InputText
          labeling={"title"}
          val={articleInputs.title}
          onChangeFun={changeArticle}
        />
        <InputText
          labeling={"body"}
          val={articleInputs.body}
          onChangeFun={changeArticle}
        />
        <FormControl className="width30">
          <InputLabel id="demo-simple-select-label">topic</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={articleInputs.topic}
            label="Age"
            onChange={(event) => {
              changeArticle(event.target.value, "topic");
            }}
          >
            {topics.map(({ slug }) => {
              return (
                <MenuItem key={slug} value={slug}>
                  {slug}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <div>
          <Button variant="contained" type="submit">
            Add Article
          </Button>
          <Button
            type="button"
            className="cancel"
            variant="contained"
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
