const { v4: uuidv4 } = require("uuid");

exports.csrfProtection = (req, res, next) => {
  const csrfCookie = req.cookies.csrfToken;
  const csrfHeader = req.headers["x-csrf-token"];

  if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
    return res.status(403).json({ message: "CSRF token invalide" });
  }

  next();
};

exports.generateCsrfToken = (req, res, next) => {
  const csrfToken = uuidv4();

  res.cookie("csrfToken", csrfToken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  next();
};
