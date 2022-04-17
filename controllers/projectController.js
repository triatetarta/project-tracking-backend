const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Project = require("../models/projectModel");

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
const createProject = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400);
    throw new Error("Please add a project and a description");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const project = await Project.create({
    title,
    description,
    user: req.user.id,
    createdBy: user.name,
  });

  res.status(201).json(project);
});

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private
const getAllProjects = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const projects = await Project.find();

  if (!projects) {
    res.status(401);
    throw new Error("No tickets found");
  }

  res.status(200).json(projects);
});

module.exports = {
  createProject,
  getAllProjects,
};
