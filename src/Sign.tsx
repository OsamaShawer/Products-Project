import { Button, Paper, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
function SignComponent() {
  
  const [emailVal, setEmailVal] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  setEmailVal(false);
  setIsRegistered(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const change = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  }
  async function handleSubmit() {
    if (!emailRegex.test(formData.email)) {
      setEmailVal(true);
      return;
    }
    const response = await fetch("http://localhost:3000", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const responseJson = await response.json();
    if (response.status === 404 && responseJson.message === "Not Found") {
      setIsRegistered(true);
    }
  }
  return (
    <Paper className="parent-sign">
      <h1 style={ { textAlign: "center" } }>Sign In</h1>
      <TextField onChange={change} sx={{ width: "100%" }} variant="outlined" label="Email" name="email"></TextField>
      <div style={{ display: emailVal ? "flex" : "none" }} className="validation-parent">
        <FontAwesomeIcon icon={faTriangleExclamation}></FontAwesomeIcon>
        <span>Invalid Email</span>
      </div>
      <div style={{ display: isRegistered ? "flex" : "none" }} className="validation-parent">
        <FontAwesomeIcon icon={faTriangleExclamation}></FontAwesomeIcon>
        <span>Email Is Not Rregistered</span>
      </div>
      <TextField onChange={change} sx={{ width: "100%" }} variant="outlined" label="Password" name="password"></TextField>
      <Button onClick={handleSubmit} sx={{ width: "100%" }} variant="contained">Submit</Button>
      <div className="acount-features">
        <Link className="link" to="/register">Create Acount</Link>
        <Link className="link" to="/forgot">Forgot Password</Link>
      </div>
    </Paper>
  );
}

export default SignComponent;