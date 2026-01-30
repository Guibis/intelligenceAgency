const pool = require("../db");

const updateAgent = async (req, res) => {
    const { id } = req.params;
    const { name, status, skills } = req.body;
    try {
        if (!name){
            const result = await pool.query("UPDATE agents SET status = $1, skills = $2 WHERE id = $3 RETURNING *;", [status, skills, id]);
        }
        if (!status){
            const result = await pool.query("UPDATE agents SET name = $1, skills = $2 WHERE id = $3 RETURNING *;", [name, skills, id]);
        }
        if (!skills){
            const result = await pool.query("UPDATE agents SET name = $1, status = $2 WHERE id = $3 RETURNING *;", [name, status, id]);
        }
        if (!name || !status){
            const result = await pool.query("UPDATE agents SET skills = $1 WHERE id = $2 RETURNING *;", [skills, id]);
        }
        if (!name || !skills){
            const result = await pool.query("UPDATE agents SET status = $1 WHERE id = $2 RETURNING *;", [status, id]);
        }
        if (!status || !skills){
            const result = await pool.query("UPDATE agents SET name = $1 WHERE id = $2 RETURNING *;", [name, id]);
        }
        if (!name || !status || !skills) {
            const result = await pool.query("UPDATE agents SET name = $1, status = $2, skills = $3 WHERE id = $4 RETURNING *;", [name, status, skills, id]);
        }        
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = updateAgent;
