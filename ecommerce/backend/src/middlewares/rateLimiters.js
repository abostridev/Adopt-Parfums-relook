const rateLimit = require("express-rate-limit");

/* ============================
   AUTH (LOGIN / REGISTER)
============================ */
exports.authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,                  // 5 tentatives max
  message: {
    message:
      "Trop de tentatives. Réessayez dans 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/* ============================
   REFRESH TOKEN
============================ */
exports.refreshLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    message: "Trop de requêtes, ralentissez.",
  },
});

/* ============================
   ADMIN (ULTRA STRICT)
============================ */
exports.adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    message: "Accès temporairement bloqué.",
  },
});

/* ============================
   API GLOBALE (SAFE)
============================ */
exports.apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  max: 120,               // large pour un user normal
});
