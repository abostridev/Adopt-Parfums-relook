require('dotenv').config();
const path = require('path');
const fs = require('fs');
const cloudinary = require('../src/config/cloudinary');
const connectDB = require('../src/config/db');
const Product = require('../src/models/Product');

const UPLOAD_DIR = path.join(process.cwd(), 'uploads', 'products');

const run = async () => {
  await connectDB();

  if (!fs.existsSync(UPLOAD_DIR)) {
    console.error('Dossier uploads/products introuvable.');
    process.exit(1);
  }

  const files = fs.readdirSync(UPLOAD_DIR).filter(f => !f.startsWith('.'));
  console.log(`Found ${files.length} files to migrate.`);

  const fileToUrlMap = {};

  // Étape 1: Upload tous les fichiers
  for (const file of files) {
    const filePath = path.join(UPLOAD_DIR, file);
    try {
      console.log(`Uploading ${file} ...`);
      const res = await cloudinary.uploader.upload(filePath, { 
        resource_type: 'image', 
        folder: 'adopt-parfums/products',
        format: 'jpg',
      });
      console.log('Uploaded:', res.secure_url);
      fileToUrlMap[file] = res.secure_url;
    } catch (err) {
      console.error('Error uploading', file, err.message);
    }
  }

  // Étape 2: Mettre à jour tous les produits
  console.log('\nUpdating product documents...');
  const products = await Product.find();
  console.log(`Found ${products.length} products to update`);

  for (const product of products) {
    const oldImages = product.images || [];
    const newImages = [];

    for (const oldImg of oldImages) {
      if (!oldImg) continue;
      
      // Extraire le nom de fichier depuis le chemin local
      const filename = oldImg.split('/').pop();
      const cloudUrl = fileToUrlMap[filename];
      
      if (cloudUrl) {
        newImages.push(cloudUrl);
        console.log(`[Product ${product._id}] ${filename} -> ${cloudUrl}`);
      } else if (oldImg.startsWith('http')) {
        // Déjà une URL, la garder
        newImages.push(oldImg);
      } else {
        console.warn(`[Product ${product._id}] No mapping for ${oldImg}`);
      }
    }

    if (newImages.length > 0) {
      product.images = newImages;
      await product.save();
      console.log(`Saved product ${product._id}`);
    }
  }

  console.log('\nMigration terminée.');
  process.exit(0);
};

run().catch(err => {
  console.error(err);
  process.exit(1);
});
