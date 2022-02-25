import { GoogleLogin } from "react-google-login";
import { googleAuth } from "../utils/api";
import { useContext } from "react";
import { LoggedIn } from "../contexts/LoggedIn";
import { useNavigate } from "react-router-dom";
export const GoogleAuth = ({ setErrorMsg, text }) => {
  const { setUser } = useContext(LoggedIn);
  const navigate = useNavigate();

  const handleGoogleLogin = async (googleData) => {
    googleAuth(googleData.profileObj)
      .then((user) => {
        localStorage.setItem("user", JSON.stringify(user));
        setErrorMsg("");
        setUser(user);
        navigate("/dashboard");
      })
      .catch((err) => {
        setErrorMsg(err.response.data.msg);
      });
  };
  return (
    <GoogleLogin
      clientId={
        "2455894431-3v25k7me45u0nl4bgdhbio75ng2uaenu.apps.googleusercontent.com"
      }
      buttonText={text}
      onSuccess={handleGoogleLogin}
      onFailure={handleGoogleLogin}
      cookiePolicy={"single_host_origin"}
      width={"1000px"}
    />
  );
};
