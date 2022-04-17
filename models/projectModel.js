const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      require: [true, "Please enter project's title"],
    },
    description: {
      type: String,
      required: [true, "Please enter a description"],
    },
    createdBy: {
      type: String,
      required: [true, "Please enter a name"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
