import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.status(200).send("Express Is working On Node");
});

app.listen(port, () => { console.log("Working on port"), port; });