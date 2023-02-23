import React, { useEffect } from "react";
import "./style.css";
import Badge from "@mui/material/Badge";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { StaticDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import PropaneTankIcon from "@mui/icons-material/PropaneTank";
import OpacityIcon from "@mui/icons-material/Opacity";
import { useUserAuth } from "../../context/UseUserAuth";

export default function Calender() {

  const {gas, water} = useUserAuth();
  const [value, setValue] = React.useState(dayjs("2022-04-07"));
  const [isLoading, setIsLoading] = React.useState(true);

  const styleDay = {
    fontSize: "1.4rem",
    backgroundColor: "rgb(255 237 226 / 9%)",
    border: "1.5px solid rgb(51 51 79 / 17%)",
    color:'black'
  }

  useEffect(() => {
    if(gas && water){
      setIsLoading(false);
    }
  },[gas, water]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        onChange={(newValue) => {
          setValue(newValue);
        }}
        loading={isLoading}
        displayStaticWrapperAs="desktop"
        label="Week picker"
        renderInput={(params) => <TextField {...params} />}
        renderDay={(day, _value, DayComponentProps) => {
          const isGas =
            !DayComponentProps.outsideCurrentMonth &&
            gas.indexOf(dayjs(day).format("L")) >= 0;

          const isWater =
            !DayComponentProps.outsideCurrentMonth &&
            water.indexOf(dayjs(day).format("L")) >= 0;

          return (
            <Badge
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              key={day.toString()}
              overlap="circular"
              badgeContent={
                isGas ? (
                  <PropaneTankIcon style={{ color: "red" }} />
                ) : undefined
              }
            >
              <Badge
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                overlap="circular"
                badgeContent={
                  isWater ? (
                    <OpacityIcon style={{ color: "blue" }} />
                  ) : undefined
                }
              >
                <PickersDay
                  style={isGas || isWater ? styleDay : {fontSize: "1.4rem"}}
                  {...DayComponentProps}
                />
              </Badge>
            </Badge>
          );
        }}
      />
    </LocalizationProvider>
  );
}
