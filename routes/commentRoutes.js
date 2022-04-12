const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  addComment,
  getComments,
  deleteComment,
  updateComment,
} = require("../controllers/commentController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getComments).post(protect, addComment);
router.route("/:id").delete(protect, deleteComment).put(protect, updateComment);

module.exports = router;
