import React, { useState } from "react";
import { Avatar, CircularProgress, IconButton } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import NightlightIcon from "@mui/icons-material/Nightlight";
import LightModeIcon from "@mui/icons-material/LightMode";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UseUserAuth";
import Profile from "./Profile";

const Navbar = ({ switchTheme, theme }) => {
  const navigate = useNavigate();
  const {user, image, loading } = useUserAuth();
  const [openProfile, setOpenProfile] = useState(false);

  const handleOpenProfile = () => {
    setOpenProfile(true);
  };

  const handleCloseProfile = () => {
    setOpenProfile(false);
  };

  return (
    <div className="navbar">
      <div className="app-name">
        <p onClick={() => navigate("/")}>Home Manager</p>
      </div>
      <div style={{ flex: 1 }} />
      <div className="avatar">
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
        {!user && !loading ? (
          <div onClick={() => navigate("login")} className="login">
            <LockOutlinedIcon fontSize="inherit" />
            <p>Log In</p>
          </div>
        ) : (
          <div>
            <IconButton onClick={handleOpenProfile}>
              <Avatar
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
                {user?.username ? (
                  user.username.slice(0, 1)
                ) : (
                  <CircularProgress
                    style={{
                      width: "15px",
                      height: "15px",
                      color: "white",
                    }}
                  />
                )}
              </Avatar>
            </IconButton>
          </div>
        )}
      </div>
      <Profile
        openDrawer={openProfile}
        handleClose={handleCloseProfile}
        theme={theme}
      />
    </div>
  );
};

export default Navbar;
