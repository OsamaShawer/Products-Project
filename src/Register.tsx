import { faLock, faTriangleExclamation, faUser } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, InputAdornment, Paper, TextField } from "@mui/material";
import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
function Register() {
  let transfer = useNavigate();
  const [emailVal, setEmailVal] = useState(false);
  const [passwordVal, setPasswordVal] = useState(false);
  const [passwordValNull, setPasswordValNull] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [username, setUsername] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const change = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };
  async function handleSubmit() {
    setEmailVal(false);
    setPasswordVal(false);
    setPasswordValNull(false);
    setRegistered(false);
    setUsername(false);
    console.log(emailRegex.test(formData.email));
    if (!emailRegex.test(formData.email)) {
      setEmailVal(true);
      return;
    }
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseJson = await response.json();
    if (response.status === 400 && responseJson.message === "User Registered") {
      setRegistered(true);
      return;
    } else if (
      response.status === 400 &&
      responseJson.message === "Not The Same Password"
    ) {
      setPasswordVal(true);
      return;
    }
    if (formData.password === "") {
      setPasswordValNull(true);
    }
    if (
      response.status === 400 &&
      responseJson.message === "The Username Is Taken"
    ) {
      setUsername(true);
    }
    transfer("/register/code");
  }
  return (
    <Paper
      sx={{
        width: "600px",
        padding: "20px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
      className="parent-code"
    >
      <h1 style={{ textAlign: "center" }}>Reigster</h1>
      <TextField
        onChange={change}
        sx={{ width: "100%" }}
        variant="outlined"
        label="Username"
        name="username"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FontAwesomeIcon icon={faUser} />
            </InputAdornment>
          ),
        }}
      ></TextField>
      <div
        style={{ display: username ? "flex" : "none" }}
        className="validation-parent"
      >
        <FontAwesomeIcon icon={faTriangleExclamation}></FontAwesomeIcon>
        <span>Username is taken</span>
      </div>
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
        style={{ display: registered ? "flex" : "none" }}
        className="validation-parent"
      >
        <FontAwesomeIcon icon={faTriangleExclamation}></FontAwesomeIcon>
        <span>Email Is Already Registered</span>
      </div>
      <TextField
        onChange={change}
        sx={{ width: "100%" }}
        variant="outlined"
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
        style={{ display: passwordValNull ? "flex" : "none" }}
        className="validation-parent"
      >
        <FontAwesomeIcon icon={faTriangleExclamation}></FontAwesomeIcon>
        <span>Invalid Password</span>
      </div>
      <TextField
        onChange={change}
        sx={{ width: "100%" }}
        variant="outlined"
        label="Confirm Password"
        name="confirmPassword"
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
        <span>Password Is Not The Same</span>
      </div>
      <Button onClick={handleSubmit} sx={{ width: "100%" }} variant="contained">
        Submit
      </Button>
    </Paper>
  );
}

export default Register;
