import React, { useEffect, useState } from "react";
import { Avatar} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Skeleton from "@mui/material/Skeleton";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";
import ToggleOnSharpIcon from "@mui/icons-material/ToggleOnSharp";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import NightlightIcon from "@mui/icons-material/Nightlight";
import LightModeIcon from "@mui/icons-material/LightMode";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UseUserAuth";
import Logout from "@mui/icons-material/Logout";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Profile from "./Profile";

const Navbar = ({ switchTheme, theme }) => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, user, image } = useUserAuth();
  const [userProfile, setUserProfile] = useState({
    username: null,
    email: null,
  });
  const [open, setOpen] = React.useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  useEffect(() => {
    // console.log(isLoggedIn);
    if (isLoggedIn) {
      setUserProfile(user);
    } else {
      setUserProfile(null);
    }

    
  }, [isLoggedIn, user]);

  useEffect(() => {
  }, [userProfile]);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };
  const handleOpenProfile = () => {
    setOpenProfile(true);
  };

  const handleCloseProfile = () => {
    setOpenProfile(false);
  };

  const logoutHandle = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  const toggleDrawer = (open) => (event) => {
    // console.log(open);
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenDrawer(open);
  };

  return (
    <div className="navbar">
      <div className="app-name">
        <p onClick={() => navigate("/")}>Home Manager</p>
      </div>
      <div style={{ flex: 1 }} />
      <div className="avatar">
        {userProfile ? (
          <ClickAwayListener onClickAway={handleClickAway}>
            <div>
              {!userProfile.username ? (
                <Skeleton
                  variant="circular"
                  width="35px"
                  height="35px"
                ></Skeleton>
              ) : (
                <Avatar
                  onClick={handleClick}
                  sx={{
                    bgcolor: "#8774e1",
                    cursor: "pointer",
                    fontWeight: "bold",
                    width: "35px",
                    height: "35px",
                    fontFamily: "poppines",
                  }}
                  src={image}
                >
                  {userProfile.username ? (
                    userProfile.username.slice(0, 1)
                  ) : (
                    <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  )}
                </Avatar>
              )}
              {open ? (
                <div className="expandMenu">
                  <div className="content">
                    <div className="row" onClick={handleOpenProfile}>
                      <AccountCircleRoundedIcon
                       sx={{
                        width: "22px",
                        height: "22px",
                        cursor: "pointer",
                      }}
                      />
                      <p>Profile</p>
                    </div>
                    <div  onClick={logoutHandle}  className="row">
                      <Logout 
                       sx={{
                        width: "18px",
                        height: "18px",
                        cursor: "pointer",
                      }}
                      />
                      <p>Logout</p>
                    </div>
                  </div>
                  <div className="line" />
                  <div className="theme">
                    <p>Dark Mode</p>
                    {theme === "light" || null ? (
                      <ToggleOffOutlinedIcon
                        onClick={switchTheme}
                        sx={{
                          width: "40px",
                          height: "40px",
                          cursor: "pointer",
                        }}
                      />
                    ) : (
                      <ToggleOnSharpIcon
                        onClick={switchTheme}
                        sx={{
                          width: "40px",
                          height: "40px",
                          cursor: "pointer",
                        }}
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div>{null}</div>
              )}
            </div>
          </ClickAwayListener>
        ) : (
          <>
            <div
              className="theme"
              style={{
                background: "transparent",
              }}
            >
              {theme === "dark" ? (
                <LightModeIcon
                  onClick={switchTheme}
                  sx={{
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                />
              ) : (
                <NightlightIcon
                  onClick={switchTheme}
                  sx={{
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                />
              )}
            </div>
            <div onClick={() => navigate("login")} className="login">
              <LockOutlinedIcon fontSize="inherit" />
              <p>Log In</p>
            </div>
          </>
        )}
      </div>
      <Profile openDrawer = {openProfile} handleClose={handleCloseProfile} theme = {theme}/>
    </div>
  );
};

export default Navbar;
