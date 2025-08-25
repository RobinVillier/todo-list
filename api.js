import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// lire les données depuis le JSON
function readData(path) {
    if (!fs.existsSync(path)) return [];
    const raw = fs.readFileSync(path, "utf8");
    return JSON.parse(raw);
}

// écrire les données dans le JSON
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
        "date": new Date()
    });
    
    writeData(settingsJson, path)
    res.json({success: true});
});

app.listen(port, () => console.log(`API is running at http://localhost:${port}`));