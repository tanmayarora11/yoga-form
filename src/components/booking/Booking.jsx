import React from "react";
import { useState } from "react";
import "../style.css";
import yoga_img from "../../images/yoga_img.webp";
import logo from "../../images/logo.webp";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import * as api from "../../axios";

export default function Payment() {
  const params = useParams();
  const [value, setValue] = useState(null);
  const [formdetails, setFormdetails] = useState({
    date: "",
    batch: "",
    uid: params.id,
  });

  const [error, setError] = useState({
    display: "none",
    satement: "",
    severity: "",
  });

  function utctoiso(date) {
    if (date === undefined) return;
    let newDate = new Date(
      date?.getTime() - date?.getTimezoneOffset() * 60 * 1000
    );
    return newDate;
  }

  const navigate = useNavigate();

  const handleForm = async () => {
    if (formdetails.date === "") {
      setError({
        display: "block",
        satement: "Please select date",
        severity: "error",
      });
      setTimeout(() => {
        setError({ display: "none", satement: "", severity: "" });
      }, 2000);
    } else if (formdetails.batch === "") {
      setError({
        display: "block",
        satement: "Please select batch",
        severity: "error",
      });
      setTimeout(() => {
        setError({ display: "none", satement: "", severity: "" });
      }, 2000);
    } else {
      setError({ display: "none", satement: "", severity: "" });
      let date = utctoiso(formdetails.date?.$d)
        ?.toISOString()
        ?.substring(0, 10);
      let newObj = {
        ...formdetails,
        date: date,
      };
      let res = await api.booking(newObj);
      if (res.data.message.includes("completed")) {
        setError({
          display: "block",
          satement: "Slot booked",
          severity: "success",
        });
        setTimeout(() => {
          navigate(`/pay/${params.id}`);
        }, 2000);
      } else {
        setError({
          display: "block",
          satement: `${res.data.message}`,
          severity: "info",
        });
        setTimeout(() => {
          setError({ display: "none", satement: "", severity: "" });
        }, 2000);
      }
    }
  };

  return (
    <>
      <Alert
        sx={{
          display: error.display === "block" ? "flex" : "none",
          background: "#ffc7b8",
        }}
        severity={error.severity}
      >
        {error.satement}
      </Alert>
      <div className="container">
        <div className="cont-img pay-cont-img">
          <img src={yoga_img} alt="yogi" />
        </div>
        <div className="cont-form pay-cont">
          <div className="form-nav pay-form-nav">
            <div className="nav-logo pay-nav-logo">
              <img src={logo} alt="" />
            </div>
            <div className="nav-text pay-nav">
              <p>Yog Aarambh</p>
            </div>
          </div>
          <div className="form-content pay-form-content">
            <h1>Let's begin</h1>
            <p>Book Your Slot Now</p>
          </div>
          <div className="form-fillups pay-form">
            <div className="form-fill-up-1 pay-form-1">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Basic example"
                  value={value}
                  minDate={Date.now()}
                  onChange={(newValue) => {
                    setValue(newValue);
                    setFormdetails({
                      ...formdetails,
                      date: newValue,
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <FormControl sx={{ width: 240 }}>
                <InputLabel id="demo-simple-select-label">Batch</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                  onChange={(e) =>
                    setFormdetails({
                      ...formdetails,
                      batch: e.target.value,
                    })
                  }
                >
                  <MenuItem value={1}>6-7AM</MenuItem>
                  <MenuItem value={2}>7-8AM</MenuItem>
                  <MenuItem value={3}>8-9AM</MenuItem>
                  <MenuItem value={4}>5-6PM</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="form-btn pay-btn">
              <Button
                style={{
                  borderRadius: 35,
                  backgroundColor: "#f97777",
                  padding: "16px 34px",
                  fontSize: "16px",
                  border: "none",
                  color: "white",
                }}
                variant="outlined"
                onClick={handleForm}
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
