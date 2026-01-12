require('dotenv').config();
require("./src/config/passport");

const app = require('./src/app');
const connectDB = require('./src/config/db');

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


