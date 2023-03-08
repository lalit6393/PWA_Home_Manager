import React, { useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import homeStyle from "./style.module.css";
import NewGroup from "./group/NewGroup";
import axios from "axios";
import { useUserAuth } from "../../context/UseUserAuth";
import { Avatar, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { url, user, setGas, setWater } = useUserAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [rerender, setRerender] = useState(0);
  const [group, setGroup] = useState(null);
  const [loadingGroup, setLoadingGroup] = useState(true);

  useEffect(() => {
    axios
      .get(`${url}/group/${user.username}`)
      .then((res) => {
        // console.log('home.js',res.data);
        setGroup(res.data);
        setGas(res.data.gas);
        setWater(res.data.water);
        setLoadingGroup(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingGroup(false);
      });
  }, [rerender]);

  useEffect(() => {}, [group]);

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
          {loadingGroup ? (
            <div className={homeStyle.groupSkeleton}>
              <Skeleton
                variant="circular"
                width="40px"
                height="40px"
                animation="wave"
                sx={{ fontSize: "1.6rem" }}
              />
              <Skeleton
                variant="text"
                width="105px"
                height="4rem"
                animation="wave"
                sx={{ fontSize: "1.6rem" }}
              />
            </div>
          ) : (
            <>
              {group ? (
                group.map((grp) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                      key={grp._id}
                      onClick={() => navigate(`/gp/${grp._id}`)}
                    >
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
                      <p style={{ paddingTop: "0.6rem", fontSize: "1.4rem" }}>
                        {grp.grupName}
                      </p>
                    </div>
                  );
                })
              ) : (
                <p>No Group Found.</p>
              )}
            </>
          )}
        </div>
        <NewGroup
          open={open}
          handleClose={handleClose}
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
