const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const totalRevenueAgg = await Order.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]);

    const totalRevenue = totalRevenueAgg[0]?.total || 0;

    const lowStockProducts = await Product.countDocuments({
      stock: { $lte: 5 },
    });

    const pendingOrders = await Order.countDocuments({
      status: "pending",
    });

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "name email");

    res.json({
      stats: {
        totalOrders,
        totalRevenue,
        lowStockProducts,
        pendingOrders,
      },
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
