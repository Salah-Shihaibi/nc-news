export const Dashboard = ({ user, setUser }) => {
  if (user !== null) {
    return (
      <div>
        <h2>Dashboard</h2>
        <button
          onClick={() => {
            localStorage.setItem("user", JSON.stringify(null));
            setUser(null);
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
