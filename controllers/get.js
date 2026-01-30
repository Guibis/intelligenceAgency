const pool = require("../db");

const getAgents = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM agents ORDER BY id ASC;");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching agents" });
    }
};

const getAgentById = async (req, res) => {
    const { id } = req.params;
    try {
        if(!id) {
            return res.status(404).json({ message: "Agent not found" });
        }
        const result = await pool.query("SELECT * FROM agents WHERE id = $1;", [id]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = getAgents, getAgentById;
