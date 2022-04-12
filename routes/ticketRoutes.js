const express = require("express");
const {
  getTickets,
  getAllTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
} = require("../controllers/ticketController");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

// Re-route into comment router
const commentRouter = require("./commentRoutes");
router.use("/:ticketId/comments", commentRouter);

router.route("/").get(protect, getTickets).post(protect, createTicket);

router.route("/allTickets").get(protect, getAllTickets);

router
  .route("/:id")
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);

module.exports = router;
