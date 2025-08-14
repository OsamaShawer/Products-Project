import { Button, Paper, TextField } from "@mui/material";
// import { result } from "./backend/src/index"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
function SendCode() {
  const transfer = useNavigate();
  let [visibilityFailed, setVisibilityFailed] = useState(false);
  let [code, setCode] = useState({code: ""});
  // let [] = useState({code: "", email: ""})
  
  // let randomNumber = ;

  async function handleSubmit() {
    setVisibilityFailed(false);

    const response = await fetch("http://localhost:3000/register/code", {
      method: "POST",
      body: JSON.stringify(code),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const responseJSON = await response.json();

    if (response.status === 200 && responseJSON.message === "Registered") {
      transfer("/");
    } else {
      setVisibilityFailed(true);
      return;
    }
  }

  return (
    <Paper sx={{ padding: "20px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", display: "flex", flexDirection: "column", alignItems: "center" }} className="parent-code">
      <p>You recived a code into your email which has:</p>
      <b>6-digits-code</b>
      <TextField onChange={(e) => setCode({ code: e.target.value })} label="Code" variant="standard"  inputProps={{ maxLength: 6, minLength: 6, pattern: "\d" }} ></TextField>
      <div style={{ display: visibilityFailed ? "flex" : "none"}} className="validation-parent">
        <FontAwesomeIcon icon={faTriangleExclamation} />
        <span className="validation">Wrong Code</span>
      </div>
      <Button sx={{ width: "100%", marginTop: "20px" }} onClick={handleSubmit} variant="contained">Submit</Button>
    </Paper>
  );
}

export default SendCode;