const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Comment = require("../models/commentModel");
const Ticket = require("../models/ticketModel");

// @desc    Get comments for a ticket
// @route   GET /api/tickets/:ticketId/comments
// @access  Private
const getComments = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const comments = await Comment.find({ ticket: req.params.ticketId });

  res.status(200).json(comments);
});

// @desc    Create ticket comment
// @route   POST /api/tickets/:ticketId/comments
// @access  Private
const addComment = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const comment = await Comment.create({
    ticket: req.params.ticketId,
    text: req.body.text,
    isStaff: false,
    user: req.user.id,
    name: user.name,
  });

  res.status(200).json(comment);
});

// @desc    Delete ticket comment
// @route   POST /api/tickets/:ticketId/comments/:commentId
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    res.status(401);
    throw new Error("Ticket not found");
  }

  if (comment.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  await comment.remove();

  res.status(200).json({ id: req.params.id });
});

// @desc    Update ticket comment
// @route   PUT /api/tickets/:id/comments/:commentId
// @access  Private
const updateComment = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    res.status(401);
    throw new Error("Ticket not found");
  }

  if (comment.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    req.params.id,
    { text: req.body.commentText },
    { new: true }
  );

  res.status(200).json(updatedComment);
});

module.exports = {
  getComments,
  addComment,
  deleteComment,
  updateComment,
};
