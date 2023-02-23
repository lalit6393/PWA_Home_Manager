import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserAuth } from "../../context/UseUserAuth";
import emailStyle from "./style.module.css";

const EmailVerify = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    setIsLoggedIn,
    url,
    setUser,
    setLoading,
    setMessage,
    setNotificationType,
    setOpenNotifi,
  } = useUserAuth();

  const handleClick = () => {
    axios
      .post(`${url}/users/verify/${params.uid}`, { emailVerified: "true" })
      .then((res) => {
        // console.log(res.data);
        if (res.data.user.verified) {
          localStorage.clear();
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("username", res.data.user.username);
          localStorage.setItem("email", res.data.user.email);
          setUser(res.data.user);
          setIsLoggedIn(true);
          setLoading(false);
          setMessage("Verification successful");
          setNotificationType("success");
          setOpenNotifi(true);
          setTimeout(() => {
            navigate("/");
          }, 100);
        } else {
          setMessage("Some Error occured.Try again!");
          setNotificationType("error");
          setOpenNotifi(true);
        }
      })
      .catch((err) => {
        // console.log(err);
        setMessage(err.message);
        setNotificationType("error");
        setOpenNotifi(true);
      });
  };

  return (
    <div className={emailStyle.emailverify}>
      <div>
        Verify that you are logging in...
        <button onClick={handleClick}>Verify</button>
      </div>
    </div>
  );
};

export default EmailVerify;
