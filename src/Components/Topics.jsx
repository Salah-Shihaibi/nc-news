import React from "react";
import { useContext } from "react";
import { TopicsList } from "../contexts/Topics";

export const Topics = ({ setTopic, setSelectTopic }) => {
  const { topics } = useContext(TopicsList);

  return (
    <div
      className="popup"
      onClick={() => {
        setTopic("");
        setSelectTopic(false);
      }}
    >
      <div className="topic_wrap">
        {topics.map(({ slug, description }) => {
          return (
            <div
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
    </div>
  );
};
