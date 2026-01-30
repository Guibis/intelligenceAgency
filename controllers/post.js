const pool = require("../db");

const createAgent = async (req, res) => {
    const { name, status, skills } = req.body;
    try {
        if(!name || !status || !skills) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const result = await pool.query("INSERT INTO agents (name, status, skills) VALUES ($1, $2, $3) RETURNING *;", [name, status, skills]);
        res.status(201).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = createAgent;
