import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UseUserAuth";
import { Avatar, CircularProgress, IconButton } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import NightlightIcon from "@mui/icons-material/Nightlight";
import LightModeIcon from "@mui/icons-material/LightMode";
import Profile from "./Profile";
import navStyles from "../style";
import "./style.css";

const Navbar = ({ switchTheme}) => {
  const navigate = useNavigate();
  const { user, image, loading, theme } = useUserAuth();
  const [openProfile, setOpenProfile] = useState(false);

  const handleOpenProfile = () => {
    setOpenProfile(true);
  };

  const handleCloseProfile = () => {
    setOpenProfile(false);
  };

  console.log("navbar");

  return (
    <header className="navbar">
      <div className="app-name">
        <p onClick={() => navigate("/")}>Home Manager</p>
      </div>
      <div style={{ flex: 1 }} />
      <div className="avatar">
        <div className="theme">
          {theme === "dark" ? (
            <LightModeIcon onClick={switchTheme} sx={navStyles.iconStyle} />
          ) : (
            <NightlightIcon onClick={switchTheme} sx={navStyles.iconStyle} />
          )}
        </div>
        {!user && !loading ? (
          <div onClick={() => navigate("login")} className="login">
            <LockOutlinedIcon fontSize="inherit" />
            <p>Log In</p>
          </div>
        ) : (
          <div>
            <IconButton onClick={handleOpenProfile}>
              <Avatar sx={navStyles.avatarStyle} src={image}>
                {user?.username ? (
                  user.username.slice(0, 1)
                ) : (
                  <CircularProgress style={navStyles.circularProgressStyle} />
                )}
              </Avatar>
            </IconButton>
          </div>
        )}
      </div>
      <Profile
        openDrawer={openProfile}
        handleClose={handleCloseProfile}
      />
    </header>
  );
};

export default Navbar;
