const pool = require("../db");

const updateAgent = async (req, res) => {
    const { id } = req.params;
    const { name, status, skills } = req.body;
    try {
        if (name) {
            return res.status(400).json({ message: "Can't update name" });
        }

        let result;
        if (status && skills) {
             result = await pool.query("UPDATE agents SET status = $1, skills = $2 WHERE id = $3 RETURNING *;", [status, skills, id]);
        } else if (status) {
             result = await pool.query("UPDATE agents SET status = $1 WHERE id = $2 RETURNING *;", [status, id]);
        } else if (skills) {
             result = await pool.query("UPDATE agents SET skills = $1 WHERE id = $2 RETURNING *;", [skills, id]);
        } else {
             return res.status(400).json({ message: "No data to update" });
        }

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Agent not found" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = updateAgent;
