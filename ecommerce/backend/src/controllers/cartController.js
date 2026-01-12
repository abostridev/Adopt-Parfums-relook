const User = require('../models/User');
const Product = require('../models/Product');

// POST /api/cart/add
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Produit non trouvé' });
  }

  const user = await User.findById(req.user._id);

  const itemIndex = user.cart.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex > -1) {
    user.cart[itemIndex].quantity += quantity;
  } else {
    user.cart.push({ product: productId, quantity });
  }

  await user.save();
  res.json(user.cart);
};

// GET /api/cart
exports.getCart = async (req, res) => {
  const user = await User.findById(req.user._id).populate('cart.product');
  res.json(user.cart);
};

// DELETE /api/cart/remove/:productId
exports.removeFromCart = async (req, res) => {
  const user = await User.findById(req.user._id);

  user.cart = user.cart.filter(
    (item) => item.product.toString() !== req.params.productId
  );

  await user.save();
  res.json(user.cart);
};
