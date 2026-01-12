const mongoose = require("mongoose");

const adviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    video: {
      type: String, // ex: /uploads/advices/video.mp4
    },

    isActive: {
      type: Boolean,
      default: true, // affiché côté client
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Advice", adviceSchema);
