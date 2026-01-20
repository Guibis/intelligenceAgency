const express = require("express");

const app = express();

const fs = require("fs");

app.use(express.json());

const AGENTS_FILE = "./agents.json";

const PORT = 3000;

const readAgents = () => {
    try {
        const data = fs.readFileSync(AGENTS_FILE, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

app.get("/agents", (req, res) => {
    const agents = readAgents();
    res.json(agents);
});

app.get("/agents/:id", (req, res) => {
    const agents = readAgents();
    const agent = agents.find((a) => a.id == req.params.id);
    if (agent) {
        res.json(agent);
    } else {
        res.status(404).json({ message: "Agent not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});