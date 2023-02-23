import React from 'react';
import gpStyle from "./style.module.css";
import { Avatar, AvatarGroup, Dialog } from "@mui/material";
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import Addperson from "./Addperson";
import Slide from "@mui/material/Slide";
import { useParams } from 'react-router-dom';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

const GroupInfo = ({open, openDrawer, handleClose, groupInfo, handleClickOpen2, handleClose2, setMessage, setNotificationType, setOpenNotifi, setRerender, rerender}) => {
 
    const params = useParams();
 
 
    return (
    <Dialog
    fullScreen
    open={openDrawer}
    onClose={handleClose}
    TransitionComponent={Transition}
  >
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className={gpStyle.gpbar2} sx={{ position: "relative" }}>
        <div className={gpStyle.gpavatar}>
          <ArrowBackRoundedIcon
            onClick={handleClose}
            sx={{
              cursor: "pointer",
              fontWeight: "bold",
              width: "25px",
              height: "25px",
            }}
          />
        </div>
        <div style={{ flex: 1 }} />
        <div className={gpStyle.icon}>
          <div>
            <MoreVertRoundedIcon
              sx={{
                cursor: "pointer",
                fontWeight: "bold",
                width: "25px",
                height: "25px",
              }}
            />
          </div>
        </div>
      </div>
      <div className={gpStyle.avatargroup}>
        <AvatarGroup max={5}>
          {groupInfo?.member?.map((member, i) => (
            <Avatar
              key={i}
              sx={{
                bgcolor: "#8774e1",
                cursor: "pointer",
                fontWeight: "bold",
                width: "40px",
                height: "40px",
                fontFamily: "poppines",
                fontSize: "1.6rem",
              }}
              src="#"
            >
              {member.slice(0, 1)?.toUpperCase()}
            </Avatar>
          ))}
        </AvatarGroup>
      </div>
      <div className={gpStyle.avatargroup} style={{fontSize:'2rem', fontWeight:'600'}}>{groupInfo?.grupName}</div>
      <div onClick={handleClickOpen2} className={gpStyle.addperson}>
            <div style={{display: "flex"}}>
               <PersonAddAltRoundedIcon
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  width: "25px",
                  height: "25px",
                }}
               />
               
            </div>
            <div>
              <p>Add people</p>
            </div>
      </div>
      <div className={gpStyle.addperson} style={{"borderTop": "1.5px solid #b2afaf75"}}>
           <div>
            <p>Group member</p>
            </div>
            <div style={{"flex":"1"}}/>
            <div>
              <p>{groupInfo?.member?.length}</p>
            </div>
      </div>
      <div className={gpStyle.gpmember}>
        <ul>
        {groupInfo?.member.map((member, i) => {
           return <li key={i}>
               <Avatar
              sx={{
                bgcolor: "#8774e1",
                cursor: "pointer",
                fontWeight: "bold",
                width: "25px",
                height: "25px",
                fontSize: "1rem",
              }}
              src="#"
            >
              {member.slice(0, 1)?.toUpperCase()}
            </Avatar>
            <p>{member}</p>
            <div style={{"flex":'1'}}/>
            {member === groupInfo?.admin ? <p>Admin</p> : null}
            </li>
        })}
        </ul>
      </div>
    </div>
    <Addperson
    open={open}
    handleClose={handleClose2}
    setRerender={setRerender}
    rerender={rerender}
    groupId={params.gpid}
    />
  </Dialog>
  )
}

export default GroupInfo;