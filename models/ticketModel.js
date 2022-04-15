const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: mongoose.Schema.Types.String,
      required: true,
      ref: "User",
    },
    project: {
      type: String,
      required: [true, "Please enter project's name"],
    },
    description: {
      type: String,
      required: [true, "Please enter a description"],
    },
    status: {
      type: String,
      required: true,
      enum: ["to do", "in progress", "closed"],
      default: "to do",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
