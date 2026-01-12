const express = require("express");
const router = express.Router();
const { getPublicAdvices } = require("../controllers/adviceController");

router.get("/", getPublicAdvices);

module.exports = router;
