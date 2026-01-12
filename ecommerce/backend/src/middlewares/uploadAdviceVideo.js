const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/advices");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `advice-${Date.now()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Seuls les fichiers vidéo sont autorisés"), false);
  }
};

const uploadAdviceVideo = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB max
  },
});

module.exports = uploadAdviceVideo;
