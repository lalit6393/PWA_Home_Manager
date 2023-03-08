import React, { useState } from "react";
import axios from "axios";
import { useUserAuth } from "../../../context/UseUserAuth";
import newPassStyle from "./style.module.css";
import { useNavigate, useParams } from "react-router-dom";

const NewPass = () => {
  const { url, setMessage, setNotificationType, setOpenNotifi } = useUserAuth();
  const navigate = useNavigate();
  const params = useParams();
  var passw =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  const [passMessage1, setPassMessage1] = useState("rgba(0, 0, 0, 0)");
  const [passMessage2, setPassMessage2] = useState("rgba(0, 0, 0, 0)");

  const onfocus1 = (e) => {
    if (e.target.value?.match(passw)) {
      setPassMessage1("green");
    } else {
      setPassMessage1("red");
    }
  };

  const onfocusout1 = (e) => {
    if (passMessage1 !== "red" || e.target.value === "")
      setPassMessage1("rgba(0, 0, 0, 0)");
  };

  const onfocus2 = (e) => {
    if (e.target.value?.match(passw)) {
      setPassMessage2("green");
    } else {
      setPassMessage2("red");
    }
  };

  const onfocusout2 = (e) => {
    if (passMessage2 !== "red" || e.target.value === "")
      setPassMessage2("rgba(0, 0, 0, 0)");
  };

  const newPass = (e) => {
    e.preventDefault();
    if (e.target.newPass.value === e.target.confirmPass.value) {
      if (e.target.newPass.value?.match(passw)) {
        axios
          .post(
            `${url}/users/new`,
            { newPass: e.target.newPass.value },
            {
              headers: {
                Authorization: `bearer ${params.token}`,
              },
            }
          )
          .then((res) => {
            // console.log(res.data);
            if (res.data.success) {
              setMessage("Password changed!");
              setNotificationType("success");
              setOpenNotifi(true);
              navigate("/login");
            }
          })
          .catch((err) => {
            setMessage("User not found!");
            setNotificationType("error");
            setOpenNotifi(true);
          });
      }
    }
  };

  return (
    <div className={newPassStyle.login}>
      <div className={newPassStyle.outerBox}>
        <form onSubmit={newPass} className={newPassStyle.formdiv}>
          <div className={newPassStyle.input}>
            <p>
              Password must have 8 to 15 characters which contain at least one
              lowercase letter, one uppercase letter, one numeric digit, and one
              special character.
            </p>
          </div>
          <div className={newPassStyle.input}>
            <input
              name="newPass"
              type="password"
              placeholder="New Password"
              required
              autoComplete="off"
              onFocus={onfocus1}
              onChange={onfocus1}
              onBlur={onfocusout1}
              style={{
                border: `1.5px solid ${passMessage1}`,
                boxSizing: "border-box",
              }}
            />
          </div>
          <div className={newPassStyle.input}>
            <input
              name="confirmPass"
              type="password"
              placeholder="Confirm Password"
              required
              autoComplete="off"
              onFocus={onfocus2}
              onChange={onfocus2}
              onBlur={onfocusout2}
              style={{
                border: `1.5px solid ${passMessage2}`,
                boxSizing: "border-box",
              }}
            />
          </div>
          <button type="submit">Reset</button>
        </form>
      </div>
    </div>
  );
};

export default NewPass;
