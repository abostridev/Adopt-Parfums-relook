require('dotenv').config();
require("./config/passport");

const app = require('./app');
const connectDB = require('./config/db');

connectDB();

const PORT = process.env.PORT || 5000;

const rateLimit = require("express-rate-limit");

app.use("/api/auth/login", rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
}));


app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});


