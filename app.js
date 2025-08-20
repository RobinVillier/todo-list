import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Tasks Json Import
const tasksJson = JSON.parse(fs.readFileSync("data/tasks.json", "utf8"));

app.get("/getLists", (req, res) => {
  if (!tasksJson) {
    return res.status(500).json({ error: "Tasks not loaded yet" });
  }
  res.json(tasksJson);
});

// app.post("/newTask", (req, res) => {
//   res.json(posts);
// });

app.listen(port, () => console.log(`API is running at http://localhost:${port}`));