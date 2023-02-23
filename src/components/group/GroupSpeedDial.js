import React, {useState } from "react";
import "./style.css";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import OpacityIcon from "@mui/icons-material/Opacity";
import PropaneTankIcon from "@mui/icons-material/PropaneTank";
import { useUserAuth } from "../../context/UseUserAuth";
import axios from "axios";
import dayjs from "dayjs";

const GroupSpeedDial = ({groupInfo}) => {
  const { url, setGas, setWater, setMessage, setNotificationType, setOpenNotifi } = useUserAuth();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addWaterOrGas = (gasorwater) => {
    setMessage("Adding water...");
    setNotificationType("info");
    setOpenNotifi(true);
    axios.post(`${url}/wg/${gasorwater}/${groupInfo._id}`, {date:dayjs().format('L')})
      .then((res) => {
        setMessage("Added Successfully.");
        setNotificationType("success");
        setOpenNotifi(true);
        setGas(res.data.gas);
        setWater(res.data.water);
        // console.log(res);
      })
      .catch((err) => {
        setMessage("Username not found.");
        setNotificationType("error");
        setOpenNotifi(true);
        console.log(err);
      });
  };

  const actions = [
    { icon: <OpacityIcon onClick={() => addWaterOrGas('water')} />, name: "Water" },
    { icon: <PropaneTankIcon onClick={() => addWaterOrGas('gas')} />, name: "Gas" },
  ];

  return (
    <Box sx={{ height: 330, transform: "translateZ(0px)", flexGrow: 1 }}>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={
          <SpeedDialIcon
            sx={{
              display: "flex",
              height: "auto",
            }}
          />
        }
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            sx={{
              display: "flex",
              height: "auto",
              fontSize: "2rem",
            }}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default GroupSpeedDial;
