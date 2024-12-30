const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true
    },
    description: {
      type: String,
      required: false
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
  },
  { timestamps: true },
  { versionKey: false }
);
module.exports = mongoose.model("Task", TaskSchema);
