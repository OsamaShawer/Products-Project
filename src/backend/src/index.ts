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

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  secure: false,
  port: 587,
  auth: {
    user: "944089001@smtp-brevo.com", // Your Brevo SMTP login
    pass: "xtOL5PzDwUFpE20G",         // Your Brevo master password (SMTP key)
  },
  tls: {
    rejectUnauthorized: false, // Only needed if you get certificate errors
  },
});
let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let codeVariable = "";

for (let i = 0; i <= 5; i++) {
  codeVariable += numbers[Math.floor(Math.random() * 10)];
}
async function sendMail(email: string, username: string, code: string) {
  try {
    let info = await transporter.sendMail({
      from: '"ألبان أبو الباشا" <osamashawar7@gmail.com>',
      to: email,
      subject: "Verification Code For ألبان أبو الباشا",
      html: `
      <div class="parent-code" style="background-color: #999999"; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);>
        <h1>Hello ${username}</h1>
        <p>Your Verfication Code Is: ${code}</p>
      </div>
      `
    })
    console.log(info);
  } catch (err) {
    console.log("Error"  + " " + err);
  }
}



app.get("/", (req, res) => {
  res.status(200).send("Express Is Working");
});

app.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    if (password === user.password) {
      res.status(200).json({ message: "Signed In" });
    } else if (password === user.password) {
      res.status(400).json({ message: "Wrong Password" });
    } else {
      res.status(400).json({ message: "Wrong" });
    }
  } else {
    res.status(404).json({ message: "Not Found" });
  }
})


let data = { username: "", email: "", password: "", confirmPassword: "" };
app.post("/register", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  data = req.body;
  console.log(confirmPassword + " " + password);
  if (await userModel.findOne({ email })) {
    res.status(400).json({ message: "User Registered" });
    return;
  } else if (confirmPassword != password) {
    res.status(400).json({ message: "Not The Same Password" });
    return;
  }
  const isUsername = await userModel.findOne(username);
  if (isUsername) {
    res.status(400).json({ message: "The Username Is Taken" });
    return;
  }

  await sendMail(email, username, codeVariable);
  res.status(200).json({ message: "Transfer" });
});

app.post("/register/code", async(req, res) => {
  if (req.body.code === codeVariable) {
    const creation = userModel.create(data);
    res.status(200).json({ message: "Registered" });
  } else {
    res.status(400).json({ message: "Wrong Code" })
  }
});

app.listen(port, () => console.log("Working on port " + port));


