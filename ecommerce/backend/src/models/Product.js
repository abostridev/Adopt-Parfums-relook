const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    slug: { type: String, required: true, unique: true },

    description: { type: String, required: true },

    price: { type: Number, required: true },

    oldPrice: { type: Number },

    isActive: {
      type: Boolean,
      default: true,
    },

    images: [{ type: String }],

    stock: { type: Number, default: 0 },

    category: {
      type: String,
      enum: ['femme', 'homme', 'enfant'],
      required: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

productSchema.pre('validate', function () {
  if (this.name && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
});

module.exports = mongoose.model('Product', productSchema);
