import { Button, Paper, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
function SignComponent() {
  const [emailVal, setEmailVal] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" })
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const change = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  }
  function handleSubmit() {
    setEmailVal(false);
    console.log(emailRegex.test(formData.email));
    if (!emailRegex.test(formData.email)) {
      setEmailVal(true);
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