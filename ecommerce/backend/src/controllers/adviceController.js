const Advice = require("../models/Advice");
const fs = require("fs");
const path = require("path");

/* ================= ADMIN ================= */

// GET /admin/conseils
exports.getAllAdvicesAdmin = async (req, res) => {
  const advices = await Advice.find().sort({ createdAt: -1 });
  res.json(advices);
};

// POST /admin/conseils
exports.createAdvice = async (req, res) => {
  const { title, description } = req.body;

  const advice = await Advice.create({
    title,
    description,
    video: req.file ? `/uploads/advices/${req.file.filename}` : null,
  });

  res.status(201).json(advice);
};

// PUT /admin/conseils/:id
exports.updateAdvice = async (req, res) => {
  const advice = await Advice.findById(req.params.id);
  if (!advice) return res.status(404).json({ message: "Introuvable" });

  advice.title = req.body.title ?? advice.title;
  advice.description = req.body.description ?? advice.description;

  if (req.file) {
    if (advice.video) {
      fs.unlinkSync(path.join(process.cwd(), advice.video));
    }
    advice.video = `/uploads/advices/${req.file.filename}`;
  }

  await advice.save();
  res.json(advice);
};

// PATCH /admin/conseils/:id/toggle
exports.toggleAdvice = async (req, res) => {
  const advice = await Advice.findById(req.params.id);
  advice.isActive = !advice.isActive;
  await advice.save();
  res.json(advice);
};

// DELETE /admin/conseils/:id
exports.deleteAdvice = async (req, res) => {
  const advice = await Advice.findById(req.params.id);
  if (!advice) return res.status(404).json({ message: "Introuvable" });

  if (advice.video) {
    fs.unlinkSync(path.join(process.cwd(), advice.video));
  }

  await advice.deleteOne();
  res.json({ message: "Supprimé" });
};

/* ================= PUBLIC ================= */

// GET /advices
exports.getPublicAdvices = async (req, res) => {
  const advices = await Advice.find({ isActive: true }).sort({ createdAt: -1 });
  res.json(advices);
};
