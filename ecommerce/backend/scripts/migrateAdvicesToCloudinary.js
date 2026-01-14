require('dotenv').config();
const path = require('path');
const fs = require('fs');
const cloudinary = require('../src/config/cloudinary');
const connectDB = require('../src/config/db');
const Advice = require('../src/models/Advice');

const UPLOAD_DIR = path.join(process.cwd(), 'uploads', 'advices');

const run = async () => {
  await connectDB();

  if (!fs.existsSync(UPLOAD_DIR)) {
    console.error('Dossier uploads/advices introuvable.');
    process.exit(1);
  }

  const files = fs.readdirSync(UPLOAD_DIR).filter(f => !f.startsWith('.'));
  console.log(`Found ${files.length} files to migrate.`);

  for (const file of files) {
    const filePath = path.join(UPLOAD_DIR, file);
    try {
      console.log(`Uploading ${file} ...`);
      const res = await cloudinary.uploader.upload(filePath, { resource_type: 'video', folder: 'adopt-parfums/advices' });
      console.log('Uploaded:', res.secure_url);

      // Update Advice documents that reference this local file
      const localPath = `/uploads/advices/${file}`;
      const updated = await Advice.updateMany({ video: localPath }, { $set: { video: res.secure_url } });
      console.log(`Updated ${updated.modifiedCount} Advice docs for ${file}`);

      // Optionally remove local file
      // fs.unlinkSync(filePath);
    } catch (err) {
      console.error('Error uploading', file, err.message);
    }
  }

  console.log('Migration terminée.');
  process.exit(0);
};

run().catch(err => {
  console.error(err);
  process.exit(1);
});
