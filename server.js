import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
    try {
        // const response = await axios.get(`${API_URL}/posts`);

        res.render("index.ejs");
    } catch (error) {
        res.status(500).json({ message: "Error fetching to do list" });
    }
});

app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
});
