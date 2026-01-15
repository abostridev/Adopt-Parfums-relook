const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { apiLimiter } = require("../middlewares/rateLimiters");
const {
  addToCart,
  getCart,
  removeFromCart,
} = require('../controllers/cartController');
const validate = require("../middlewares/validate");
const { addToCartSchema } = require("../validators/cart.schema");
const { csrfProtection } = require("../middlewares/csrf");

router.use(apiLimiter);


router.post('/add', protect, validate(addToCartSchema),  addToCart);
router.get('/', protect, getCart);
router.delete('/remove/:productId', protect, removeFromCart);

module.exports = router;
