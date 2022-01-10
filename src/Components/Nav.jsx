import { Link } from "react-router-dom";
export const Nav = ({ user }) => {
  return (
    <nav>
      <ul>
        <li>Logo</li>
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
          </>
        )}
        <li>
          {user ? (
            <img src={user.avatar_url} alt={user.avatar_url} width="30px"></img>
          ) : (
            <img src="" alt="no user"></img>
          )}
        </li>
      </ul>
    </nav>
  );
};
