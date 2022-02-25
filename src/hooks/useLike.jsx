import { useState, useEffect } from "react";
import { useContext } from "react";
import { LoggedIn } from "../contexts/LoggedIn";

export const useLike = (
  id,
  editVote,
  fetchUserVotes,
  removeUserVote,
  postUserVote,
  editUserVote,
  destructuring,
  voteForId
) => {
  const {
    user: { username },
  } = useContext(LoggedIn);
  const [vote, setVote] = useState(false);
  const [voteCounter, setVoteCounter] = useState(0);

  useEffect(() => {
    fetchUserVotes(username).then((body) => {
      const userVoted = body[destructuring].find(
        (itemsVoted) => itemsVoted[voteForId] === Number(id)
      );

      if (userVoted) {
        if (userVoted.voting_status === "up") {
          setVoteCounter(-1);
          setVote(1);
        }
        if (userVoted.voting_status === "down") {
          setVoteCounter(1);
          setVote(-1);
        }
      } else setVote(0);
    });
  }, [destructuring, fetchUserVotes, id, username, voteForId]);

  const voting = (liked) => {
    if (liked === "like" && vote === 1) {
      removeUserVote(username, id).then(() => {
        setVote(0);
        editVote(id, { inc_votes: -1 });
      });
    }
    if (liked === "like" && vote === 0) {
      postUserVote({
        username: username,
        [voteForId]: id,
        voting_status: "up",
      }).then(() => {
        setVote(1);
        editVote(id, { inc_votes: 1 });
      });
    }
    if (liked === "like" && vote === -1) {
      editUserVote(username, id, { edit_vote_status: "up" }).then(() => {
        editVote(id, { inc_votes: 2 });
        setVote(1);
      });
    }
    if (liked === "dislike" && vote === -1) {
      removeUserVote(username, id).then(() => {
        editVote(id, { inc_votes: 1 });
        setVote(0);
      });
    }

    if (liked === "dislike" && vote === 0) {
      postUserVote({
        username: username,
        [voteForId]: id,
        voting_status: "down",
      }).then(() => {
        editVote(id, { inc_votes: -1 });
        setVote(-1);
      });
    }
    if (liked === "dislike" && vote === 1) {
      editUserVote(username, id, { edit_vote_status: "down" }).then(() => {
        editVote(id, { inc_votes: -2 });
        setVote(-1);
      });
    }
  };
  return { vote, voting, voteCounter };
};
