import { Button, Paper, TextField } from "@mui/material";

function RegisterCode() {
  return (
    <Paper className="parent-sign2">
      <span>We Sent To Your Email A Code Which Has</span>
      <b>6 digits code</b>
      <TextField variant="standard" label="Code"></TextField>
      <Button variant="contained" sx={{ width: "100%" }}>Submit</Button>
    </Paper>
  );
}
export default RegisterCode;