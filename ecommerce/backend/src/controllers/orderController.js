const Order = require('../models/Order');
const User = require('../models/User');

// POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.product');

    if (!user || user.cart.length === 0) {
      return res.status(400).json({ message: 'Panier vide' });
    }

    // Vérifier le stock
    for (const item of user.cart) {
      if (item.product.stock < item.quantity) {
        return res.status(400).json({
          message: `Stock insuffisant pour ${item.product.name}`,
        });
      }
    }

    // Construire la commande
    const items = user.cart.map(item => ({
      product: item.product._id,
      name: item.product.name,
      image: item.product.images[0],
      price: item.product.price,
      quantity: item.quantity,
    }));

    const totalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.user._id,
      items,
      totalPrice,
      shippingAddress: req.body.shippingAddress

    });

    // Décrémenter le stock
    for (const item of user.cart) {
      item.product.stock -= item.quantity;
      await item.product.save();
    }

    // Vider le panier
    user.cart = [];
    await user.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/orders/my
exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
};
