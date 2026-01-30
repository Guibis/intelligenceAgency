const pool = require("../db");

const deleteAgent = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM agents WHERE id = $1", [id]);
        if(result.rowCount === 0) {
            return res.status(404).json({ message: "Agent not found" });
        }
        return res.status(200).json({ message: `Agent with ID ${id} deleted successfully` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = deleteAgent;
