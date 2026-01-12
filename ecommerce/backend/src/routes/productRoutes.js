const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/authMiddleware');
const admin = require('../middlewares/adminMiddleware');

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  searchProducts

} = require('../controllers/productController');
const validate = require("../middlewares/validate");
const { createProductSchema } = require("../validators/product.schema");



router.get("/search", searchProducts);


// PUBLIC
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.get('/category/:category', getProductsByCategory);


// ADMIN
router.post('/', protect, admin, validate(createProductSchema), createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
