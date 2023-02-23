import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useUserAuth } from "../../../context/UseUserAuth";

const NewGroup = ({
  open,
  handleClose,
  setMessage,
  setNotificationType,
  setOpenNotifi,
  setRerender,
  rerender
}) => {
  const { url, user } = useUserAuth();
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Group</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a new group to easily manage your home and stay up-to-date.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={gpName}
            onChange={(e) => setGpName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createNewGroup}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewGroup;
