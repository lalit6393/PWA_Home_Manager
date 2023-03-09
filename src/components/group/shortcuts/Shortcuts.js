import { Button, TextField} from "@mui/material";
import React, { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import srtcut from "./style.module.css";

const Shortcuts = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState('');
  const [data, setData] = useState([{name:"Gas", price: 1150},{name:"Water", price: 30}]);

  const list = data.map((item, i) =>   <li key={i}>{item.name}<span>{item.price} INR</span></li>);

  const handleSubmit = (e) => {
    if(name && price)
    setData([...data, {name:name, price: price}]);
    e.preventDefault();
  };

  return (
    <div className={srtcut.pageDiv}>
      <div className={srtcut.secondDiv}>
        <div>
          <form className={srtcut.form} onSubmit={handleSubmit}>
            <div>
                <p>Add New Item To Shortcut</p>
            </div>
            <div>
              <label>Name: </label>
              <TextField
                id="outlined-basic"
                variant="outlined"
                autoComplete="off"
                value={name}
                placeholder="Name"
                type={"text"}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Amount: </label>
              <TextField
                id="outlined-start-adornment"
                placeholder="Price"
                value={price}
                type={"number"}
                variant="outlined"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <Button
                type="submit"
                variant="contained"
                startIcon={<AddRoundedIcon />}
                sx={{
                  fontSize: "1.2rem",
                  fontFamily: "poppines",
                  fontWeight: "600",
                }}
              >
                Add new
              </Button>
            </div>
          </form>
        </div>
        <div className={srtcut.list}>
            <ul>
              {list}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Shortcuts;
