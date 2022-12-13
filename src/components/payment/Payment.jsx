import React from "react";
import { useState } from "react";
import "../style.css";
import yoga_img from "../../images/yoga_img.webp";
import logo from "../../images/logo.webp";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import * as api from "../../axios";

export default function Payment() {
  const params = useParams();
  const [formdetails, setFormdetails] = useState({
    card_no: "",
    cvv: "",
    noc: "",
    amt: "500",
    uid: params.id,
  });

  const [error, setError] = useState({
    display: "none",
    satement: "",
    severity: "",
  });

  const navigate = useNavigate();

  const handleForm = async () => {
    if (formdetails.card_no === "") {
      setError({
        display: "block",
        satement: "Please enter valid card no",
        severity: "error",
      });
      setTimeout(() => {
        setError({ display: "none", satement: "", severity: "" });
      }, 2000);
    } else if (formdetails.cvv === "") {
      setError({
        display: "block",
        satement: "Please enter your cvv",
        severity: "error",
      });
      setTimeout(() => {
        setError({ display: "none", satement: "", severity: "" });
      }, 2000);
    } else if (formdetails.noc === "") {
      setError({
        display: "block",
        satement: "Please enter name on card",
        severity: "error",
      });
      setTimeout(() => {
        setError({ display: "none", satement: "", severity: "" });
      }, 2000);
    } else {
      setError({ display: "none", satement: "", severity: "" });
      let res = await api.payment(formdetails);
      console.log(res);
      if (res.data.message.includes("Success")) {
        setError({
          display: "block",
          satement: "Payment Successfull",
          severity: "success",
        });
        setTimeout(() => {
          setError({
            display: "block",
            satement: "Redirecting...",
            severity: "info",
          });
        }, 2000);
        setTimeout(() => {
          setError({ display: "none", satement: "", severity: "" });
          navigate(`/`);
        }, 4000);
      } else {
        setError({
          display: "block",
          satement: "Payment Unsuccessfull Try again",
          severity: "error",
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
            <h1>Congrats!!</h1>
            <p>Your registration was successfull</p>
          </div>
          <div className="form-fillups pay-form">
            <div className="form-fill-up-1 pay-form-1">
              <TextField
                id="outlined-basic"
                label="Card Number"
                variant="outlined"
                type="Number"
                required
                onChange={(e) =>
                  setFormdetails({
                    ...formdetails,
                    card_no: e.target.value,
                  })
                }
              />
              <TextField
                id="outlined-basic"
                label="CVV"
                variant="outlined"
                type="Password"
                required
                onChange={(e) =>
                  setFormdetails({
                    ...formdetails,
                    cvv: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-fill-up-2 pay-form-2">
              <TextField
                id="outlined-basic"
                label="Name on Card"
                variant="outlined"
                required
                onChange={(e) =>
                  setFormdetails({
                    ...formdetails,
                    noc: e.target.value,
                  })
                }
              />
              <TextField
                id="outlined-basic"
                variant="outlined"
                type="Number"
                value="500"
              />
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
                Pay
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
