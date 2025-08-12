import express from "express";
import cors from "cors";
import userModel from "./database/model";
import mongoose from "mongoose";
import nodemailer from 'nodemailer';
const app = express();
const port = 3000;


mongoose.connect("mongodb://localhost:27017/UsersData").then(() => console.log("Connected")).catch((err) => console.log("Error" + err));
app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());

// const transporter = nodemailer.createTransport({
  
// })





app.get("/", (req, res) => {
  res.status(200).send("Express Is Working");
});

app.post("register", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  if (await userModel.findOne(email)) {
    res.status(400).json({ message: "User Registered" });
    return;
  }
  // await sendNail(email, username)
  res.status(200).json({ message: "Transfer" });

});

app.listen(port, () => console.log("Working on port " + port));