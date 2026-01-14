const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");
const uploadAdviceVideo = require("../middlewares/uploadAdviceVideo");
const uploadProductImage = require("../middlewares/uploadProductImage");
const { adminLimiter } = require("../middlewares/rateLimiters");

router.use(adminLimiter);

const {
  getDashboardStats,
} = require("../controllers/adminController");

const {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/adminOrderController");

// DASHBOARD
router.get("/dashboard", protect, admin, getDashboardStats);

// ORDERS
router.get("/orders", protect, admin, getAllOrders);
router.get("/orders/:id", protect, admin, getOrderById);
router.put("/orders/:id/status", protect, admin, updateOrderStatus);


// PRODUCTS
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/adminProductController");

router.get("/products", protect, admin, getProducts);
router.post("/products", protect, admin, uploadProductImage.single("image"), createProduct);
router.put("/products/:id", protect, admin, uploadProductImage.single("image"), updateProduct);
router.delete("/products/:id", protect, admin, deleteProduct);




// CONSEILS
const {
  createAdvice,
  getAllAdvicesAdmin,
  deleteAdvice,
  updateAdvice,
  toggleAdvice,
} = require("../controllers/adviceController");

// CONSEILS
router.get("/conseils", protect, admin, getAllAdvicesAdmin);

router.post("/conseils", protect, admin, uploadAdviceVideo.single("video"), createAdvice);

router.delete("/conseils/:id", protect, admin, deleteAdvice);

router.put("/conseils/:id", protect, admin, uploadAdviceVideo.single("video"), updateAdvice);

router.patch("/conseils/:id/toggle", protect, admin, toggleAdvice);


module.exports = router;
