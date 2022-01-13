import { useState } from "react";
export const useLike = (id, editVote) => {
  const [vote, setVote] = useState(0);

  const voting = (liked) => {
    if (liked === "like" && vote === 1) {
      setVote(0);
      editVote(id, { inc_votes: -1 });
    }
    if (liked === "like" && vote === 0) {
      setVote(1);
      editVote(id, { inc_votes: 1 });
    }
    if (liked === "like" && vote === -1) {
      setVote(1);
      editVote(id, { inc_votes: 2 });
    }
    if (liked === "dislike" && vote === -1) {
      setVote(0);
      editVote(id, { inc_votes: 1 });
    }

    if (liked === "dislike" && vote === 0) {
      setVote(-1);
      editVote(id, { inc_votes: -1 });
    }
    if (liked === "dislike" && vote === 1) {
      setVote(-1);
      editVote(id, { inc_votes: -2 });
    }
  };
  return { vote, voting };
};
