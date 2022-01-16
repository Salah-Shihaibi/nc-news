import { useState } from "react";
import { postTopic } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TopicsList } from "../contexts/Topics";
//import styles from "../style/AddTopic.module.css";
import { Button, Alert, Avatar } from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { InputText } from "./InputText";

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
      <Avatar sx={{ width: 56, height: 56, m: 1, bgcolor: "primary.main" }}>
        <PostAddIcon size="large"></PostAddIcon>
      </Avatar>
      <p className="title">Add topic</p>
      {errorMsg ? <Alert severity="error">{errorMsg}</Alert> : null}
      <form onSubmit={postTopicOnSubmit} className="form_global">
        <InputText
          labeling={"slug"}
          val={topicInputs.slug}
          onChangeFun={changeTopic}
        />

        <InputText
          labeling={"description"}
          val={topicInputs.description}
          onChangeFun={changeTopic}
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
