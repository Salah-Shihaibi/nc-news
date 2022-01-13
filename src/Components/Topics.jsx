import React from "react";
import { useContext } from "react";
import { TopicsList } from "../contexts/Topics";

export const Topics = ({ setTopic, setSelectTopic }) => {
  const { topics } = useContext(TopicsList);

  return (
    <>
      <div
        onClick={() => {
          setTopic("");
          setSelectTopic(false);
        }}
      >
        All articles
      </div>
      {topics.map(({ slug, description }) => {
        return (
          <div
            onClick={() => {
              setTopic(`topic=${slug}`);
              setSelectTopic(false);
            }}
          >
            slug: {slug}
            description: {description}
          </div>
        );
      })}
    </>
  );
};
