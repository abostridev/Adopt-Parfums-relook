const Product = require('../models/Product');

// GET /api/products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET /api/products/:id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/products/category/:category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    // Sécurité : catégories autorisées
    const allowedCategories = ['femme', 'homme', 'enfant'];
    if (!allowedCategories.includes(category)) {
      return res.status(400).json({ message: 'Catégorie invalide' });
    }

    const products = await Product.find({ category });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.searchProducts = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 8;
  const skip = (page - 1) * limit;
  const q = req.query.q || "";

  // Recherche intelligente
  const query = {
    $or: [
      { name: { $regex: q, $options: "i" } },
      { category: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
    ],
  };

  const [products, total] = await Promise.all([
    Product.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    Product.countDocuments(query),
  ]);

  res.json({
    products,
    page,
    totalPages: Math.ceil(total / limit),
    totalResults: total,
  });
};



// POST /api/products
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    res.json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






exports.createProduct = async (req, res) => {
  try {
    console.log('BODY REÇU :', req.body);

    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.log('ERREUR PRODUIT :', error.message);
    res.status(400).json({ message: error.message });
  }
}
