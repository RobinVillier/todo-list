import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Read data from a given json path
function readData(path) {
    if (!fs.existsSync(path)) return [];
    const raw = fs.readFileSync(path, "utf8");
    return JSON.parse(raw);
}

// Write given data to a given json path
function writeData(data, path) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

app.get("/getLists", (req, res) => {
    const settingsJson = readData("data/settings.json");
  
    if (!settingsJson) {
        return res.status(500).json({ error: "Tasks not loaded yet" });
    }

    res.json(settingsJson);
});

// Add New Task
app.post("/newTask", (req, res) => {
    const path = "data/settings.json"
    const settingsJson = readData(path);
    const container = req.body.container
    
    const list = settingsJson.lists.find(l => l.name.toLowerCase() === container.toLowerCase());
    list.tasks.push({
        "title": req.body.title,
        "description": req.body.description,
        "date": new Date().toISOString().split('T')[0],
        "done": false
    });
    
    writeData(settingsJson, path)
    res.json({success: true});
});

app.post("/updateTask", (req, res) => {
    const { listName, taskIndex, done } = req.body;
    const path = "data/settings.json"
    const settingsJson = readData(path);
    
    // Find corresponding list
    const list = settingsJson.lists.find(l => l.name === listName);
    if (!list) return res.status(404).json({ error: "List not found" });
    
    // Find corresponding task
    if (!list.tasks[taskIndex]) {
        return res.status(404).json({ error: "Task not found" });
    }
    
    // Update State
    list.tasks[taskIndex].done = done;
    writeData(settingsJson, path);

    res.json({ success: true });
});

app.listen(port, () => console.log(`API is running at http://localhost:${port}`));