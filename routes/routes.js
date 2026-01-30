const express = require("express");
const router = express.Router();

const getAgents = require("../controllers/get");
const getAgentById = require("../controllers/get");
const createAgent = require("../controllers/post");
const updateAgent = require("../controllers/put");
const deleteAgent = require("../controllers/delete");

router.get("/agents", getAgents);
router.get("/agents/:id", getAgentById);
router.post("/agents", createAgent);
router.put("/agents/:id", updateAgent);
router.delete("/agents/:id", deleteAgent);


module.exports = router;
