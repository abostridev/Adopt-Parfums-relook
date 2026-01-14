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

    // Si image uploadée via Cloudinary
    if (req.file) {
      data.images = [req.file.path]; // URL complète de Cloudinary
    }

    const product = await Product.create(data);
    res.status(201).json(product);
  } catch (error) {
    console.error("[Product Creation Error]", error);
    res.status(400).json({
      message: "Erreur création produit",
      ...(process.env.NODE_ENV === "development" && { error: error.message }),
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
    
    // Si nouvelle image uploadée
    if (req.file) {
      product.images = [req.file.path];
    } else if (req.body.images) {
      product.images = Array.isArray(req.body.images) 
        ? req.body.images 
        : [req.body.images];
    }

    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    console.error("[Product Update Error]", error);
    res.status(500).json({
      message: "Erreur mise à jour produit",
      ...(process.env.NODE_ENV === "development" && { error: error.message }),
    });
  }
};

