const Order = require("../models/Order");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return res.status(404).json({ message: "Commande introuvable" });
  }

  res.json(order);
};

exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  const allowedStatus = ["pending", "paid", "shipped", "delivered"];
  if (!allowedStatus.includes(status)) {
    return res.status(400).json({ message: "Statut invalide" });
  }

  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: "Commande introuvable" });
  }

  order.status = status;

  // logique métier
  if (status === "paid") {
    order.isPaid = true;
    order.paidAt = new Date();
  }

  await order.save();

  res.json(order);
};

