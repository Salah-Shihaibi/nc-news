import { useLocation } from "react-router-dom";

export const ErrorPage = ({ msg, status }) => {
  let prop = useLocation().state;
  if (prop) {
    msg = prop.msg;
    status = prop.status;
  }
  return (
    <div>
      <p>{status}</p>
      <p>{msg}</p>
    </div>
  );
};
