const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const path = require("path");

require("./config/passport");
const app = express();
app.set("trust proxy", 1);



const { apiLimiter } = require("./middlewares/rateLimiters");

app.use("/api", apiLimiter);



app.use(
  cors({
    origin: [
      "https://adopt-parfums-relook.vercel.app"
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);
app.use(passport.initialize());


// Servir les images depuis le dossier "uploads"
// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));




const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adviceRoutes = require("./routes/adviceRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require('./routes/userRoutes');


app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use("/api/advices", adviceRoutes);
app.use("/api/admin", adminRoutes);




app.get('/', (req, res) => {
  res.send(' Adopt API Ecommerce démarrée avec succès');
});

module.exports = app;
