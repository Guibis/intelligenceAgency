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

const writeAgents = (agents) => {
    fs.writeFileSync(AGENTS_FILE, JSON.stringify(agents, null, 2));
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

app.post("/agents", (req, res) => {
    const { name, status, skills } = req.body;
    if (!name || !status || !skills) {
        return res.status(400).json({ message: "Name, status and skills are required" });
    }
    const agents = readAgents();
    const newAgent = {
        id: Date.now().toString(),
        name,
        status,
        skills
    };
    agents.push(newAgent);
    writeAgents(agents);
    res.status(201).json(newAgent);
});

app.put("/agents/:id", (req, res) => {
    const { name, status, skills } = req.body;
    if (!name && !status && !skills) {
        return res.status(400).json({ message: "Name, status or skills are required" });
    }
    const agents = readAgents();
    const agent = agents.find((a) => a.id === req.params.id);
    if (agent) {
        if (name) agent.name = name;
        if (status) agent.status = status;
        if (skills) agent.skills = skills;
        writeAgents(agents); 
        res.json(agent);
    } else {
        res.status(404).json({ message: "Agent not found" });
    }
});

app.delete("/agents/:id", (req, res) => {
    const agents = readAgents();
    const agent = agents.find((a) => a.id === req.params.id);
    if (agent) {
        const index = agents.indexOf(agent);
        agents.splice(index, 1);
        writeAgents(agents);
        res.json(agent);
    } else {
        res.status(404).json({ message: "Agent not found" });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});