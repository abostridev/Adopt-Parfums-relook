require('dotenv').config();
const connectDB = require('../src/config/db');
const Order = require('../src/models/Order');
const Product = require('../src/models/Product');

const run = async () => {
  await connectDB();

  console.log('Migrating order images to Cloudinary URLs...');
  
  const orders = await Order.find();
  console.log(`Found ${orders.length} orders`);

  let updated = 0;

  for (const order of orders) {
    let hasChanges = false;

    for (let i = 0; i < order.items.length; i++) {
      const item = order.items[i];
      
      // Si c'est un chemin local (/uploads/...)
      if (item.image && item.image.startsWith('/uploads')) {
        // Trouver le produit pour récupérer l'image Cloudinary
        const product = await Product.findById(item.product);
        if (product && product.images && product.images.length > 0) {
          order.items[i].image = product.images[0];
          hasChanges = true;
          console.log(`[Order ${order._id}] Updated item ${i}: ${item.name}`);
        }
      }
    }

    if (hasChanges) {
      await order.save();
      updated++;
    }
  }

  console.log(`Updated ${updated} orders with Cloudinary image URLs`);
  process.exit(0);
};

run().catch(err => {
  console.error(err);
  process.exit(1);
});
