const express = require("express");
const router = express.Router();

const {
  createProject,
  getAllProjects,
} = require("../controllers/projectController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, createProject).get(protect, getAllProjects);

module.exports = router;
