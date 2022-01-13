import { useState } from "react";
import { postTopic } from "../Utils/api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TopicsList } from "../contexts/Topics";
//import styles from "../style/AddTopic.module.css";
import { Button, TextField, Alert, Avatar } from "@mui/material";
import InputIcon from "@mui/icons-material/Input";

export const AddTopic = () => {
  const { setTopics } = useContext(TopicsList);

  const [topicInputs, setTopicInputs] = useState({
    slug: "",
    description: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const changeTopic = (value, key) => {
    setTopicInputs((currTopic) => ({ ...currTopic, [key]: value }));
  };

  const postTopicOnSubmit = (event) => {
    event.preventDefault();
    if (Object.entries(topicInputs).find((value) => value[1] === "")) {
      setErrorMsg("Please fill in all the fields");
      return null;
    }
    postTopic(topicInputs)
      .then(({ topic }) => {
        setTopics((currTopic) => [...currTopic, topic]);
        navigate(-1);
      })
      .catch((err) => {
        setErrorMsg(err.response.data.msg);
      });
  };

  return (
    <div className="container_global">
      <Avatar sx={{ width: 56, height: 56, m: 1, bgcolor: "success.main" }}>
        <InputIcon></InputIcon>
      </Avatar>
      <p className="title">Add topic</p>
      {errorMsg ? <Alert severity="error">{errorMsg}</Alert> : null}
      <form onSubmit={postTopicOnSubmit} className="form_global">
        <TextField
          className="width100"
          onChange={(event) => {
            changeTopic(event.target.value, "slug");
          }}
          value={topicInputs.slug}
          margin="normal"
          required
          label="slug"
          name="slug"
          autoComplete="slug"
          autoFocus
        />

        <TextField
          className="width100"
          onChange={(event) => {
            changeTopic(event.target.value, "description");
          }}
          value={topicInputs.description}
          margin="normal"
          required
          label="description"
          name="description"
          autoComplete="description"
          autoFocus
        />
        <div>
          <Button type="submit" variant="contained">
            Add Topic
          </Button>
          <Button
            variant="contained"
            className="cancel"
            type="button"
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
