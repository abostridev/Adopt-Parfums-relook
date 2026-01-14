const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "adopt-parfums/advices",
    resource_type: "video",
  },
});

const uploadAdviceVideo = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Seuls les fichiers vidéo sont autorisés"), false);
    }
  },
  limits: {
    fileSize: 200 * 1024 * 1024, // 200MB max
  },
});

module.exports = uploadAdviceVideo;
