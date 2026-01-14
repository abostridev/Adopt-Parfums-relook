const User = require('../models/User');
const Product = require('../models/Product');

// POST /api/cart/add
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Produit non trouvé' });

    // Sécurité Stock
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Stock insuffisant' });
    }

    const user = await User.findById(req.user._id).select('cart');
    
    const itemIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // Vérifier si le cumul ne dépasse pas le stock
      const totalNewQuantity = user.cart[itemIndex].quantity + quantity;
      if (totalNewQuantity > product.stock) {
        return res.status(400).json({ message: 'Limite de stock atteinte' });
      }
      user.cart[itemIndex].quantity = totalNewQuantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    res.status(200).json({ message: "Panier mis à jour", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de l'ajout au panier" });
  }
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
