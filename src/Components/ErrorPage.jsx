import { useLocation } from "react-router-dom";

export const ErrorPage = () => {
  const { msg, status } = useLocation().state;
  return (
    <div>
      <p>{status}</p>
      <p>{msg}</p>
    </div>
  );
};
