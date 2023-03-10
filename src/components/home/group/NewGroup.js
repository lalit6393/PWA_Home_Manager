import React, {useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useUserAuth } from "../../../context/UseUserAuth";
import newgroupStyle from "./style.module.css";

const NewGroup = ({ open, handleClose, setRerender, rerender }) => {
  const { url, user, setMessage, setNotificationType, setOpenNotifi} =
    useUserAuth();
  const [gpName, setGpName] = useState("");

  const createNewGroup = () => {
    setMessage("Creating...");
    setNotificationType("info");
    setOpenNotifi(true);
    axios
      .post(`${url}/group/${user.username}`, { grupName: gpName })
      .then((group) => {
        setMessage("Group Created.");
        setNotificationType("success");
        setOpenNotifi(true);
        // console.log(group);
        setRerender(rerender + 1);
        handleClose();
      })
      .catch((err) => {
        setMessage("Failed.");
        setNotificationType("error");
        setOpenNotifi(true);
        console.log(err);
        handleClose();
      });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        className={newgroupStyle.newgroup}
      >
        <DialogTitle
          sx={{ fontSize: "1.6rem", fontWeight: "600", fontFamily: "poppines"}}
        >
          New Group
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: "1.4rem", marginBottom:'2rem'  }}>
            Create a new group to easily manage your home and stay up-to-date.
          </DialogContentText>
          <TextField
            autoComplete="off"
            required
            fullWidth
            id="name"
            type="text"
            label="Name"
            margin="dense"
            variant="outlined"
            value={gpName}
            onChange={(e) => setGpName(e.target.value)}
            InputProps={{
              style: { fontSize: "1.4rem", fontFamily: "poppines" },
            }}
            InputLabelProps={{
              style: { fontSize: "1.4rem" },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            size="medium"
            sx={{ fontSize: "1.2rem", fontFamily: "poppines", fontWeight:'600' }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            size="medium"
            sx={{ fontSize: "1.2rem", fontFamily: "poppines", fontWeight:'600' }}
            onClick={createNewGroup}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewGroup;
