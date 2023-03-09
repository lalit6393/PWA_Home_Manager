import React, { useState } from "react";
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
  const { url, setMessage, setNotificationType, setOpenNotifi } = useUserAuth();
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
        <DialogTitle
          sx={{ fontSize: "1.6rem", fontWeight: "600", fontFamily: "poppines" }}
        >
          Add people
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: "1.4rem", marginBottom: "2rem" }}>
            Create a new group to easily manage your home and stay up-to-date.
          </DialogContentText>
          <TextField
            autoComplete="off"
            id="name"
            label="Username"
            type="text"
            fullWidth
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
            onClick={handleClose}
            variant="outlined"
            size="medium"
            sx={{
              fontSize: "1.2rem",
              fontFamily: "poppines",
              fontWeight: "600",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={addPerson}
            variant="outlined"
            size="medium"
            sx={{
              fontSize: "1.2rem",
              fontFamily: "poppines",
              fontWeight: "600",
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Addperson;
