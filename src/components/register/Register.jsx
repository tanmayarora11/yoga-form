import React from "react";
import { useState } from "react";
import "./register.css";
import "../style.css";
import yoga_img from "../../images/yoga_img.webp";
import logo from "../../images/logo.webp";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import * as api from "../../axios";

export default function Register() {
  const [formdetails, setFormdetails] = useState({
    name: "",
    email: "",
    age: "",
    phno: "",
  });
  const [error, setError] = useState({
    display: "none",
    satement: "",
    severity: "",
  });

  const navigate = useNavigate();

  const handleForm = async () => {
    if (formdetails.name === "") {
      setError({
        display: "block",
        satement: "Please enter your name",
        severity: "error",
      });
      setTimeout(() => {
        setError({ display: "none", satement: "", severity: "" });
      }, 2000);
    } else if (formdetails.email === "") {
      setError({
        display: "block",
        satement: "Please enter your email",
        severity: "error",
      });
      setTimeout(() => {
        setError({ display: "none", satement: "", severity: "" });
      }, 2000);
    } else if (formdetails.age === "") {
      setError({
        display: "block",
        satement: "Please enter your age",
        severity: "error",
      });
      setTimeout(() => {
        setError({ display: "none", satement: "", severity: "" });
      }, 2000);
    } else if (formdetails.phno === "") {
      setError({
        display: "block",
        satement: "Please enter your phone",
        severity: "error",
      });
      setTimeout(() => {
        setError({ display: "none", satement: "", severity: "" });
      }, 2000);
    } else if (!formdetails.email.includes("@") || !formdetails.email.includes(".")) {
      setError({
        display: "block",
        satement: "Enter Valid email",
        severity: "info",
      });
      setTimeout(() => {
        setError({ display: "none", satement: "", severity: "" });
      }, 2000);
    } else if (formdetails.age < 18 || formdetails.age > 65) {
      setError({
        display: "block",
        satement: "Age should be between 18 to 65",
        severity: "info",
      });
      setTimeout(() => {
        setError({ display: "none", satement: "", severity: "" });
      }, 2000);
    } else if (formdetails.phno.length < 10 || formdetails.phno.length > 10) {
      setError({
        display: "block",
        satement: "Number should be 10 digits",
        severity: "info",
      });
      setTimeout(() => {
        setError({ display: "none", satement: "", severity: "" });
      }, 2000);
    } else {
      setError({ display: "block", satement: "Loading....", severity: "info" });
      let res = await api.register(formdetails);
      setError({ display: "none", satement: "", severity: "" });
      navigate(`/book/${res.data.message.uid}`);
    }
  };

  return (
    <>
      <Alert
        sx={{
          display: error.display === "block" ? "flex" : "none",
          background: "#c8efc8",
        }}
        severity={error.severity}
      >
        {error.satement}
      </Alert>

      <div className="container">
        <div className="cont-img">
          <img src={yoga_img} alt="yogi" />
        </div>
        <div className="cont-form">
          <div className="form-nav">
            <div className="nav-logo">
              <img src={logo} alt="" />
            </div>
            <div className="nav-text">
              <p>Yog Aarambh</p>
            </div>
          </div>
          <div className="form-content">
            <h1>Enlighten Yourself</h1>
            <p>Register Now</p>
          </div>
          <div className="form-fillups">
            <div className="form-fill-up-1">
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                required
                onChange={(e) =>
                  setFormdetails({
                    ...formdetails,
                    name: e.target.value,
                  })
                }
              />
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type="Email"
                required
                onChange={(e) =>
                  setFormdetails({
                    ...formdetails,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-fill-up-2">
              <TextField
                id="outlined-basic"
                label="Age"
                variant="outlined"
                type="Number"
                required
                onChange={(e) =>
                  setFormdetails({
                    ...formdetails,
                    age: e.target.value,
                  })
                }
              />
              <TextField
                id="outlined-basic"
                label="Phone No"
                variant="outlined"
                type="Number"
                required
                onChange={(e) =>
                  setFormdetails({
                    ...formdetails,
                    phno: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-btn">
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
                Register
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
