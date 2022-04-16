const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  addComment,
  getComments,
  deleteComment,
  updateComment,
  deleteAllTicketComments,
} = require("../controllers/commentController");

const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, getComments)
  .post(protect, addComment)
  .delete(protect, deleteAllTicketComments);
router.route("/:id").delete(protect, deleteComment).put(protect, updateComment);

module.exports = router;
