const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  register,
  login,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const {
  authLimiter,
  refreshLimiter,
} = require("../middlewares/rateLimiters");

const validate = require("../middlewares/validate");
const {
  registerSchema,
  loginSchema,
} = require("../validators/auth.schema");

router.post("/register", authLimiter, validate(registerSchema), register);
router.post("/login", authLimiter, validate(loginSchema), login);
router.post("/refresh", refreshLimiter, refreshToken);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

/* GOOGLE OAUTH */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    res.redirect(`${process.env.FRONT_URL}/oauth-success`);
  }
);

module.exports = router;
