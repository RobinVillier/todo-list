import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
    // Get Lists
    try {
        const response = await axios.get(`${API_URL}/getLists`);
        
        res.render("index.ejs", {lists: response.data.lists});
    } catch (error) {
        res.status(500).json({ message: "Error fetching to do list" });
    }
    
});

// Route to new task pop up
app.post("/api/newTask", async (req, res) => {
    try {
        await axios.post(`${API_URL}/newTask`, req.body);
        
        res.redirect("/");
    } catch (error) {
        res.status(500).json({ message: "Error creating post" });
    }
});

app.patch("/api/tasks/:listName/:id", async (req, res) => {
    try {
        const { listName, id } = req.params;
        const { done } = req.body;

        await axios.patch(`${API_URL}/tasks/${listName}/${id}`, { done });

        res.redirect("/");
    } catch (error) {
        res.status(500).json({ message: "Error updating task state" });
    }
});

app.patch("/api/editTask/:listName/:id", async (req, res) => {
    try {
        const { listName, id } = req.params;
        await axios.patch(`${API_URL}/editTask/${listName}/${id}`, req.body);
        
        res.redirect("/");
    } catch (error) {
        res.status(500).json({ message: "Error editig task" });
    }
});

app.delete("/api/deleteTask/:listName/:id", async (req, res) => {
    const { listName, id } = req.params;
    await axios.delete(`${API_URL}/deleteTask/${listName}/${id}`);
    
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
});
