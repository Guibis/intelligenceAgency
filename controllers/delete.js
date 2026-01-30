const pool = require("../db");

const deleteAgent = async (req, res) => {
    const { id } = req.params;
    try {
        if(!id) {
            return res.status(404).json({ message: "Agent not found" });
        }
        const result = await pool.query("DELETE FROM agents WHERE id = $1", [id]);
        res.status(200).json({ message: "Agent deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = deleteAgent;
