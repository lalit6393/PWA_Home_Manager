import React, { useEffect, useState } from "react";
import gpStyle from "./style.module.css";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { Avatar } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUserAuth } from "../../context/UseUserAuth";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";
import GroupInfo from "./GroupInfo";
import GroupSpeedDial from "./GroupSpeedDial";
import Calender from "./Calender";


const Group = () => {
  const params = useParams();
  const { url, setWater, setGas, setMessage, setNotificationType, setOpenNotifi} = useUserAuth();
  const [groupInfo, setGroupInfo] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [open, setOpen] = useState(false);
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
        setMessage={setMessage}
        setNotificationType={setNotificationType}
        setOpenNotifi={setOpenNotifi}
        rerender={rerender}
        setRerender={setRerender}
      />
      <div className={gpStyle.gpbar} onClick={handleClickOpen}>
        <div className={gpStyle.gpname}>
          <div className={gpStyle.gpavatar}>
            <Avatar
              sx={{
                bgcolor: "#8774e1",
                cursor: "pointer",
                fontWeight: "bold",
                width: "35px",
                height: "35px",
                fontFamily: "poppines",
                fontSize: "1.6rem"
              }}
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
        <div style={{ flex: 1 }} />
        <div className={gpStyle.icon}>
          <div>
            <MoreVertRoundedIcon
              sx={{
                cursor: "pointer",
                fontWeight: "bold",
                width: "30px",
                height: "30px",
              }}
            />
          </div>
        </div>
      </div>
      <div style={{paddingTop:'5rem', boxSizing:'border-box'}}>
      <Calender/>
      </div>
      <div style={{ position: "fixed", right: "5%", bottom: "3%" }}>
        <GroupSpeedDial groupInfo={groupInfo}/>
      </div>
    </div>
  );
};

export default Group;
