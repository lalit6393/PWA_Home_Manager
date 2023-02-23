import React, { useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import homeStyle from "./style.module.css";
import NewGroup from "./group/NewGroup";
import axios from "axios";
import { useUserAuth } from "../../context/UseUserAuth";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  
  const { url, user, setGas, setWater, setMessage, setNotificationType, setOpenNotifi} = useUserAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [rerender, setRerender] = useState(0);
  const [group, setGroup ] = useState(null);

  useEffect(() => {
    axios.get(`${url}/group/${user.username}`)
      .then((res) => {
        // console.log('home.js',res.data);
        setGroup(res.data);
        setGas(res.data.gas);
        setWater(res.data.water);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [rerender]);

  useEffect(() => {},[group]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={homeStyle.home}>
      <div className={homeStyle.page}>
      <div className={homeStyle.div1}>
      <p>Home Manager</p>
      </div>
      <div className={homeStyle.div2}>
        { group ? (group.map((grp) => {

         return <div key={grp._id} onClick={() => navigate(`/gp/${grp._id}`)}>
            <Avatar
              sx={{
                bgcolor: "#8774e1",
                cursor: "pointer",
                fontWeight: "bold",
                width: "40px",
                height: "40px",
                fontFamily: "poppines",
              }}
              src="#"
            >
              {grp.grupName.slice(0, 1)}
            </Avatar>
            <p style={{paddingTop:'0.6rem', fontSize:'1.4rem'}}>{grp.grupName}</p>
          </div>;
        })): null}
      </div>
      <NewGroup
        open={open}
        handleClose={handleClose}
        setMessage={setMessage}
        setNotificationType={setNotificationType}
        setOpenNotifi={setOpenNotifi}
        setRerender={setRerender}
        rerender={rerender}
      />
      <Fab
        style={{ position: "fixed", right: "5%", bottom: "3%" }}
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
      >
        <AddIcon
          sx={{
            width: "20px",
            height: "20px",
            cursor: "pointer",
          }}
        />
      </Fab>   
      </div>
    </div>
  );
};

export default Home;
