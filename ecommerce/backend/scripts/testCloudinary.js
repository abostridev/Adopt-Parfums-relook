const cloudinary = require("cloudinary").v2;

console.log("🔍 Testing Cloudinary Configuration...\n");

const config = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

console.log("Environment Variables:");
console.log("- CLOUDINARY_CLOUD_NAME:", config.cloud_name ? "✅ SET" : "❌ MISSING");
console.log("- CLOUDINARY_API_KEY:", config.api_key ? "✅ SET" : "❌ MISSING");
console.log("- CLOUDINARY_API_SECRET:", config.api_secret ? "✅ SET" : "❌ MISSING");

if (!config.cloud_name || !config.api_key || !config.api_secret) {
  console.log("\n❌ CLOUDINARY CREDENTIALS NOT CONFIGURED");
  console.log("Please add these to your Render environment variables:");
  console.log("  - CLOUDINARY_CLOUD_NAME");
  console.log("  - CLOUDINARY_API_KEY");
  console.log("  - CLOUDINARY_API_SECRET");
  process.exit(1);
}

cloudinary.config(config);

// Test API connection
cloudinary.api
  .resources({ type: "upload", max_results: 1, prefix: "adopt-parfums" })
  .then((result) => {
    console.log("\n✅ Cloudinary connection successful!");
    console.log("Existing resources:", result.resources.length);
  })
  .catch((error) => {
    console.error("\n❌ Cloudinary connection failed:");
    console.error(error.message);
    process.exit(1);
  });
