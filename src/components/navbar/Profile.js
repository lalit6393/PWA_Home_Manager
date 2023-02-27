import React from "react";
import { Avatar, Drawer, IconButton, Skeleton } from "@mui/material";
import axios from "axios";
import { useUserAuth } from "../../context/UseUserAuth";
import "./style.css";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import CameraRoundedIcon from "@mui/icons-material/CameraRounded";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';
import { Logout } from "@mui/icons-material";

const Profile = ({ openDrawer, handleClose, theme }) => {
  const { url, user, setImage, image, setIsLoggedIn, setUser } = useUserAuth();
  // console.log(user?.username);

  const handleImageChange = (e) => {
    let file = e.nativeEvent.srcElement.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      const options = {
        method: "post",
        url: `${url}/users/img/${user.username}`,
        headers: {
          "Content-Type": "text/plain",
        },
        data: reader.result,
      };

      axios(options)
        .then((res) => {
          setImage(res.data.img);
          console.log(`Status code: ${res.status}`);
        })
        .catch((error) => {
          console.error(error);
        });
    };
  };

  const logoutHandle = () => {
    localStorage.clear();
    setImage('#');
    setUser(null);
    setIsLoggedIn(false);
    handleClose();
  };

  return (
    <Drawer
      sx={{ width: "100%" }}
      anchor={"right"}
      open={openDrawer}
      onClose={handleClose}
    >
      <div className="drawerOuterDivUserProfile" data-theme={theme}>
        <div className="UserProfileCrossIcon">
          <IconButton onClick={handleClose}>
            <ClearRoundedIcon
              sx={{
                width: "20px",
                height: "20px",
                cursor: "pointer",
                color: "var(--text-primary)",
              }}
            />
          </IconButton>
        </div>
        <div className="UserProfileavatar">
          <Avatar
            // onClick={handleClick}
            sx={{
              bgcolor: "#8774e1",
              cursor: "pointer",
              fontWeight: "bold",
              width: "100px",
              height: "100px",
              fontFamily: "poppines",
            }}
            src={image}
          >
            {user?.username ? (
              user.username.slice(0, 1)
            ) : (
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            )}
          </Avatar>
          <div className="addPohot">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                type={"file"}
                accept="image/png, image/gif, image/jpeg"
                onChange={handleImageChange}
              />
              <CameraRoundedIcon
                sx={{
                  width: "25px",
                  height: "25px",
                  cursor: "pointer",
                  color: "var(--text-primary)",
                  border: "1.5px solid var(--text-primary)",
                  borderRadius: "50%",
                }}
              />
            </IconButton>
          </div>
        </div>
        <div className="userInfoDiv">
          <AccountCircleRoundedIcon
          sx={{
            width: "25px",
            height: "25px",
            cursor: "pointer",
            color: "var(--text-primary)"
          }}
          />
            {user?.username ? (
               <p>
              {user.username}
              </p>
            ) : (
              <Skeleton
                width="70px"
                animation="wave"
                variant="text"
                sx={{ fontSize: "1.2rem" }}
              />
            )}
        </div>
        <div className="userInfoDiv">
          <MarkEmailReadRoundedIcon
            sx={{
              width: "25px",
              height: "25px",
              cursor: "pointer",
              color: "var(--text-primary)"
            }}
          />
            {user?.email ? (
               <p>
              {user.email}
              </p>
            ) : (
              <Skeleton
                width="70px"
                animation="wave"
                variant="text"
                sx={{ fontSize: "1.2rem" }}
              />
            )}
        </div>
        <div className="userInfoDiv" onClick={logoutHandle} style={{cursor:'pointer'}}>
          <Logout
            sx={{
              width: "23px",
              height: "23px",
              cursor: "pointer",
              color: "var(--text-primary)"
            }}
          />
           <p>Logout</p>
        </div>
      </div>
    </Drawer>
  );
};

export default Profile;
