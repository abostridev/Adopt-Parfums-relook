const Product = require("../models/Product");


// GET /admin/products?page=1&limit=8&search=xxx
exports.getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const search = req.query.search || "";

    const query = {
      name: { $regex: search, $options: "i" },
    };

    const total = await Product.countDocuments(query);

    const products = await Product.find(query)
      .sort({ isFeatured: -1, createdAt: -1 }) // vedette en haut
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      products,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur récupération produits",
      error: error.message,
    });
  }
};


exports.createProduct = async (req, res) => {
  try {
    const data = { ...req.body };

    // Sécurisation images (force chemin relatif)
    if (Array.isArray(data.images)) {
      data.images = data.images.map((img) => {
        if (!img) return img;
        return img.replace(/^https?:\/\/[^/]+/, "");
      });
    }

    const product = await Product.create(data);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({
      message: "Erreur création produit",
      error: error.message,
    });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Produit introuvable" });
    }

    // champs modifiables
    product.name = req.body.name ?? product.name;
    product.price = req.body.price ?? product.price;
    product.oldPrice = req.body.oldPrice ?? product.oldPrice;
    product.stock = req.body.stock ?? product.stock;
    product.category = req.body.category ?? product.category;
    product.isActive = req.body.isActive ?? product.isActive;
    product.isFeatured = req.body.isFeatured ?? product.isFeatured;
    if (req.body.images) {
      product.images = req.body.images.map((img) =>
        img.replace(/^https?:\/\/[^/]+/, "")
      );
    }

    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: "Erreur mise à jour produit",
      error: error.message,
    });
  }
};

