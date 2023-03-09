import React, { useEffect, useState } from "react";
import gpStyle from "./style.module.css";
import { Avatar, IconButton, MenuItem, Menu } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useUserAuth } from "../../context/UseUserAuth";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";
import GroupInfo from "./GroupInfo";
import GroupSpeedDial from "./GroupSpeedDial";
import Calender from "./Calender";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Graph from "./Graph";
import PropaneTankIcon from "@mui/icons-material/PropaneTank";
import OpacityIcon from "@mui/icons-material/Opacity";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import styles from "../style";

const Group = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { url, setWater, setGas } = useUserAuth();
  const [groupInfo, setGroupInfo] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [rerender, setRerender] = useState(0);

  const handleClickOpen = () => {
    setOpenDrawer(true);
  };

  const handleClose = () => {
    setOpenDrawer(false);
  };

  const handleClickOpen2 = () => {
    setOpen(true);
  };

  const handleClose2 = () => {
    setOpen(false);
  };

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    // console.log(params.gpid);
    axios
      .get(`${url}/group/gp/${params.gpid}`)
      .then((res) => {
        // console.log(res.data);
        setGroupInfo(res.data);
        setWater(res.data.water);
        setGas(res.data.gas);
      })
      .catch(console.log);
  }, [rerender]);

  useEffect(() => {
    // console.log(openDrawer);
  }, [groupInfo, openDrawer]);

  return (
    <div className={gpStyle.Group}>
      <GroupInfo
        open={open}
        openDrawer={openDrawer}
        handleClose={handleClose}
        groupInfo={groupInfo}
        handleClickOpen2={handleClickOpen2}
        handleClose2={handleClose2}
        rerender={rerender}
        setRerender={setRerender}
      />
      <div className={gpStyle.gpbar}>
        <div className={gpStyle.gpname} onClick={handleClickOpen}>
          <IconButton
              onClick={() => navigate("/")}
             sx={{
              cursor: "pointer",
              color: "var(--text-black-white)",
            }}
          >
          <ArrowBackRoundedIcon
            sx={{
              width: "25px",
              height: "25px",
            }}
          />
          </IconButton>
          <div className={gpStyle.gpavatar}>
            <Avatar
              sx={styles.avatarStyle}
              src="#"
            >
              {groupInfo ? (
                groupInfo?.grupName.slice(0, 1)?.toUpperCase()
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
          </div>
          <div>
            <p style={{ textAlign: "left" }}>
              {groupInfo ? (
                groupInfo?.grupName?.toUpperCase()
              ) : (
                <Skeleton
                  variant="text"
                  width="105px"
                  height="2rem"
                  animation="wave"
                  sx={{ fontSize: "1.6rem" }}
                />
              )}
            </p>
            <p style={{ fontSize: "1.2rem", textAlign: "left" }}>
              {groupInfo ? (
                groupInfo?.member?.length + " member"
              ) : (
                <Skeleton
                  width="70px"
                  animation="wave"
                  variant="text"
                  sx={{ fontSize: "1.2rem" }}
                />
              )}
            </p>
          </div>
        </div>
        <IconButton
          onClick={handleMenuOpen}
          sx={{
            cursor: "pointer",
            color: "var(--text-black-white)",
          }}
        >
          <BarChartRoundedIcon
            sx={{
              width: "25px",
              height: "25px",
              transform: "rotate(-90deg)",
            }}
          />
        </IconButton>
        <Menu
        id="basic-menu"
        open={menuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleMenuClose}  sx={{fontSize:"1.4rem"}}>Shortcuts</MenuItem>
      </Menu>
      </div>
      <div className={gpStyle.contentPage}>
        <div>
          <div>
            <PropaneTankIcon style={{ color: "red" }} /> Gas
          </div>
          <div>
            <OpacityIcon style={{ color: "blue" }} /> Water
          </div>
        </div>
        <div>
          <Calender />
          <Graph />
        </div>
      </div>
      <div style={{ position: "fixed", right: "5%", bottom: "3%" }}>
        <GroupSpeedDial groupInfo={groupInfo} />
      </div>
    </div>
  );
};

export default Group;
