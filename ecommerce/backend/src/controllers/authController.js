const User = require("../models/User");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/jwt");

/* ======================
   REGISTER
====================== */
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (await User.findOne({ email })) {
    return res.status(400).json({ message: "Email déjà utilisé" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
  });
};

/* ======================
   LOGIN (ACCESS + REFRESH)
================= ===== */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Identifiants invalides" });
  }

  // Générer access & refresh tokens via helpers (utilisent les bonnes clés env)
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.cookie("csrfToken", crypto.randomUUID(), {
  httpOnly: false,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
});

  res.json({
    accessToken,
  });
};






/* ======================
   REFRESH TOKEN
====================== */
exports.refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.sendStatus(401);
    }

    jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET,
      async (err, decoded) => {
        if (err) {
          return res.sendStatus(403);
        }

        const user = await User.findById(decoded.id);
        if (!user) {
          return res.sendStatus(404);
        }

        const accessToken = generateAccessToken(user);

        return res.json({ accessToken });
      }
    );
  } catch (err) {
    console.error("Refresh error:", err);
    return res.sendStatus(500);
  }
};




/* ======================
   LOGOUT
====================== */
exports.logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.sendStatus(204);
};

/* ======================
   FORGOT PASSWORD
====================== */
exports.forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.sendStatus(404);

  const resetToken = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  await user.save();

  console.log(
    `RESET LINK: ${process.env.FRONT_URL}/reset-password/${resetToken}`
  );

  res.json({ message: "Lien envoyé" });
};

/* ======================
   RESET PASSWORD
====================== */
exports.resetPassword = async (req, res) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) return res.sendStatus(400);

  user.password = await bcrypt.hash(req.body.password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.json({ message: "Mot de passe mis à jour" });
};
