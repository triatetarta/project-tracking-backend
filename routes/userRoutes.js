const express = require("express");
const router = express.Router();

const {
  registerUser,
  getAccount,
  loginUser,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/account", protect, getAccount);

module.exports = router;
