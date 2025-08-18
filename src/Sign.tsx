import { Button, InputAdornment, Paper, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faEnvelope,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alban from "./assets/alban.png";

function SignComponent() {
  const [emailVal, setEmailVal] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [passwordVal, setPasswordVal] = useState(false);
  const [wrong, setWrong] = useState(false);
  const transfer = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const change = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };
  async function handleSubmit() {
    setEmailVal(false);
    setIsRegistered(false);
    if (!emailRegex.test(formData.email)) {
      setEmailVal(true);
      return;
    }
    const response = await fetch("http://localhost:3000", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseJSON = await response.json();
    if (response.status === 404 && responseJSON.message === "Not Found") {
      setIsRegistered(true);
      return;
    } else if (
      response.status === 400 &&
      responseJSON.message === "Wrong Password"
    ) {
      setPasswordVal(true);
      return;
    } else if (response.status === 400 && responseJSON.nessage === "Wrong") {
      setWrong(true);
      return;
    } else {
      transfer("/");
    }
  }
  return (
    <Paper className="parent-sign">
      <div className="image-side">
        <div className="image-and-text">
          <p style={{ border: "1px solid #eee", textAlign: "center", transform: "translate(5px, -20px)", fontWeight: "bold", fontSize: "22px" }}>أبو الباشا</p>
          <img src={Alban} alt="abu albasha" />
          <p style={{ border: "1px solid #eee", textAlign: "center", transform: "translate(5px, 10px)", fontWeight: "bold", fontSize: "22px" }}>بيت ريما</p>
        </div>
      </div>
      <hr className="break-line" />
      <div style={{ padding: "30px"}} className="parent-sign-div">
        <h1 style={{ textAlign: "center" }}>Sign In</h1>
        <TextField
          onChange={change}
          sx={{ width: "100%" }}
          variant="outlined"
          label="Email"
          name="email"
          InputProps={{
          startAdornment: (
          <InputAdornment position="start">
            <FontAwesomeIcon icon={faEnvelope} />
          </InputAdornment>
    ),
  }}
        ></TextField>

        <div
          style={{ display: emailVal ? "flex" : "none" }}
          className="validation-parent"
        >
          <FontAwesomeIcon icon={faTriangleExclamation}></FontAwesomeIcon>
          <span>Invalid Email</span>
        </div>
        <div
          style={{ display: isRegistered ? "flex" : "none" }}
          className="validation-parent"
        >
          <FontAwesomeIcon icon={faTriangleExclamation}></FontAwesomeIcon>
          <span>Email Is Not Rregistered</span>
        </div>
        <TextField
          onChange={change}
          sx={{ width: "100%" }}
          variant="outlined"
          type="password"
          label="Password"
          name="password"
          InputProps={{
          startAdornment: (
          <InputAdornment position="start">
            <FontAwesomeIcon icon={faLock} />
          </InputAdornment>
    ),
  }}
        ></TextField>
        <div
          style={{ display: passwordVal ? "flex" : "none" }}
          className="validation-parent"
        >
          <FontAwesomeIcon icon={faTriangleExclamation}></FontAwesomeIcon>
          <span>Wrong Password</span>
        </div>
        <div
          style={{ display: wrong ? "flex" : "none" }}
          className="validation-parent"
        >
          <FontAwesomeIcon icon={faTriangleExclamation}></FontAwesomeIcon>
          <span>Something Went Wrong</span>
        </div>
        <div className="acount-features">
          <Link className="link" to="/register">
            Create Acount
          </Link>
          <Link className="link" to="/forgot">
            Forgot Password
          </Link>
        </div>
        <Button
          onClick={handleSubmit}
          sx={{ width: "100%" }}
          variant="contained"
        >
          Submit
        </Button>
      </div>
    </Paper>
  );
}

export default SignComponent;
