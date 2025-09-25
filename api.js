import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import { log } from "console";

const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const path = "data/settings_work.json";

// Read data from a given json path
function readData() {
    if (!fs.existsSync(path)) return [];
    const raw = fs.readFileSync(path, "utf8");
    return JSON.parse(raw);
};

// Write given data to a given json path
function writeData(data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
};

app.get("/getLists", (req, res) => {
    const settingsJson = readData();
    
  
    if (!settingsJson) {
        return res.status(500).json({ error: "Tasks not loaded yet" });
    }

    res.json(settingsJson);
});

app.post("/newList", (req, res) => {
    const settingsJson = readData();

    settingsJson.lists.push({
      "name": req.body.name,
      "tasks": [],
      "active": true
    });
    
    writeData(settingsJson);
    res.json({success: true});
});

// Add New Task
app.post("/newTask", (req, res) => {
    const settingsJson = readData();
    const container = req.body.container
    
    const list = settingsJson.lists.find(l => l.name.toLowerCase() === container.toLowerCase());
    list.tasks.push({
        "title": req.body.title,
        "description": req.body.description,
        "date": new Date().toISOString().split('T')[0],
        "done": false
    });
    
    writeData(settingsJson)
    res.json({success: true});
});

app.patch("/tasks/:listName/:id", (req, res) => {
    const { listName, id } = req.params;
    const { done } = req.body;
    const settingsJson = readData();

    // Find corresponding list
    const list = settingsJson.lists.find(l => l.name === listName);
    if (!list) return res.status(404).json({ error: "List not found" });

    // Find corresponding task
    if (!list.tasks[id]) {
        return res.status(404).json({ error: "Task not found" });
    }

    // Update State
    list.tasks[id].done = done;
    writeData(settingsJson);

    res.json({ success: true });
});

app.patch("/editTask/:listName/:id", (req, res) => {
    const { listName, id } = req.params;
    const settingsJson = readData();
    
    // Find corresponding list
    const list = settingsJson.lists.find(l => l.name === listName);
    if (!list) return res.status(404).json({ error: "List not found" });

    // Find corresponding task
    if (!list.tasks[id]) {
        return res.status(404).json({ error: "Task not found" });
    }
    
    list.tasks[id].title = req.body.title;
    list.tasks[id].description = req.body.description;
    writeData(settingsJson);

    res.json({ success: true });
});

app.patch("/editStatus/:listName", (req, res) => {
    const listName = req.params.listName
    
    const settingsJson = readData();

    const list = settingsJson.lists.find(l => l.name === listName);
    list.active = req.body.active
    
    writeData(settingsJson);
    res.json({ success: true });
});

app.delete("/deleteTask/:listName/:id", (req, res) => {
    const { listName, id } = req.params;
    const settingsJson = readData();

    // Find corresponding list
    const list = settingsJson.lists.find(l => l.name === listName);
    if (!list) return res.status(404).json({ error: "List not found" });

    // Find corresponding task
    if (!list.tasks[id]) {
        return res.status(404).json({ error: "Task not found" });
    }

    list.tasks.splice(id, 1)
    
    writeData(settingsJson);

    res.json({ success: true });
});

app.listen(port, () => console.log(`API is running at http://localhost:${port}`));