import { useContext } from "react";
import { TopicsList } from "../contexts/Topics";
import { Popup } from "./Popup";

export const Topics = ({ setTopic, setSelectTopic }) => {
  const { topics } = useContext(TopicsList);

  return (
    <Popup
      setShow={() => {
        setTopic("");
        setSelectTopic(false);
      }}
      classes={""}
    >
      <div className="topic_wrap">
        {topics.map(({ slug, description }) => {
          return (
            <div
              key={slug}
              className="topics point"
              onClick={(event) => {
                event.stopPropagation();
                setTopic(`&topic=${slug}`);
                setSelectTopic(false);
              }}
            >
              <p className="article_title">{slug}</p>
              <p className="article_body">{description}</p>
            </div>
          );
        })}
      </div>
    </Popup>
  );
};
