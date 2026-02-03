const pool = require("../db");

const updateAgent = async (req, res) => {
    const { id } = req.params;
    try {
        const updates = { name, status, skills } = req.body;
        const columns = Object.keys(updates).filter(key => updates[key] !== undefined);

        if (columns.length === 0) {
            return res.status(400).json({ message: "No updates provided" });
        }

        const setClause = columns.map((col, index) => `${col} = $${index + 1}`).join(", ");
        const values = [...columns.map(col => updates[col]), id];

        const query = `UPDATE agents SET ${setClause} WHERE id = $${columns.length + 1} RETURNING *`;
        const result = await pool.query(query, values);
        res.json(result.rows[0]);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = updateAgent;
