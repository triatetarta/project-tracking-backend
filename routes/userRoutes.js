const express = require("express");
const router = express.Router();

const {
  registerUser,
  updateUser,
  loginUser,
  getAllUsers,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.put("/:id", protect, updateUser);
router.get("/all", protect, getAllUsers);

module.exports = router;
