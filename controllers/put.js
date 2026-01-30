const pool = require("../db");

const updateAgent = async (req, res) => {
    const { id } = req.params;
    const { name, status, skills } = req.body;
    try {
        if (name){
            return res.status(400).json({ message: "Can't update name" });
        }
        if (!status){
            const result = await pool.query("UPDATE agents SET skills = $1 WHERE id = $2 RETURNING *;", [skills, id]);
            return res.status(200).json(result.rows[0]);
        }
        if (!skills){
            const result = await pool.query("UPDATE agents SET status = $1 WHERE id = $2 RETURNING *;", [status, id]);
            return res.status(200).json(result.rows[0]);
        } else {
            const result = await pool.query("UPDATE agents SET status = $1, skills = $2 WHERE id = $3 RETURNING *;", [status, skills, id]);
            return res.status(200).json(result.rows[0]);
        }        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = updateAgent;
