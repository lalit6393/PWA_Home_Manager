import React, {useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useUserAuth } from "../../context/UseUserAuth";

const Addperson = ({ open, handleClose, setRerender, rerender, groupId }) => {
  const { url, setMessage, setNotificationType, setOpenNotifi } =
    useUserAuth();
  const [gpName, setGpName] = useState("");

  const addPerson = () => {
    setMessage("Adding...");
    setNotificationType("info");
    setOpenNotifi(true);
    axios
      .put(`${url}/group/${gpName}/${groupId}`)
      .then((group) => {
        setMessage("Added Successfully.");
        setNotificationType("success");
        setOpenNotifi(true);
        // console.log(group);
        setRerender(rerender + 1);
        handleClose();
      })
      .catch((err) => {
        setMessage("Username not found.");
        setNotificationType("error");
        setOpenNotifi(true);
        // console.log("err ", err);
        handleClose();
      });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle fontSize={"1.6rem"} fontWeight={600}>
          Add people
        </DialogTitle>
        <DialogContent>
          <DialogContentText fontSize={"1.4rem"}>
            Create a new group to easily manage your home and stay up-to-date.
          </DialogContentText>
          <TextField
            fontSize="1.4rem"
            autoComplete="off"
            margin="dense"
            id="name"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            value={gpName}
            onChange={(e) => setGpName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} fontSize={"1.3rem"}>
            Cancel
          </Button>
          <Button onClick={addPerson} fontSize={"1.3rem"}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Addperson;
