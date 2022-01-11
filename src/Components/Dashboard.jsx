import { useContext } from "react";
import { LoggedIn } from "../contexts/LoggedIn";

export const Dashboard = () => {
  const { user, logout, setUser } = useContext(LoggedIn);
  if (user) {
    return (
      <div>
        <h2>Dashboard</h2>
        <button
          onClick={() => {
            logout(setUser);
          }}
        >
          Logout
        </button>
        <img src={user.avatar_url} alt={user.username} width={"100px"} />
        <p>{user.name}</p>
        <p>{user.username}</p>
      </div>
    );
  } else {
    return <></>;
  }
};
