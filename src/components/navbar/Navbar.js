import React, { Fragment, useEffect, useState } from "react";
import { Avatar, Drawer } from "@mui/material";
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
import DehazeIcon from "@mui/icons-material/Dehaze";

const Navbar = ({ switchTheme, theme}) => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, user } = useUserAuth();
  const [userProfile, setUserProfile] = useState({
    username: null,
    email: null,
  });
  const [open, setOpen] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);

  useEffect(() => {
    // console.log(isLoggedIn);
    if (isLoggedIn) {
      setUserProfile(user);
    } else {
      setUserProfile(null);
    }
  }, [isLoggedIn, user]);

  useEffect(() => {}, [userProfile]);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
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
        <Fragment>
          <div className="arrowIcon">
            <DehazeIcon
              onClick={toggleDrawer(true)}
              sx={{
                fontSize: "2rem",
                padding: "0 1rem"
              }}
            />
          </div>
          <Drawer
            style={{backgroundColor:`var(--part1-background)`}}
            anchor={"left"}
            open={openDrawer}
            onClose={toggleDrawer(false)}
          >
            <div className='drawerList'>
              <ul>
                <li>Home</li>
              </ul>
            </div>
          </Drawer>
        </Fragment>
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
                  src="#"
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
                    <p>
                      {userProfile?.username || (
                        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                      )}
                    </p>
                    <p>
                      {userProfile?.email || (
                        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                      )}
                    </p>
                    <p onClick={logoutHandle}>Logout</p>
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
    </div>
  );
};

export default Navbar;
