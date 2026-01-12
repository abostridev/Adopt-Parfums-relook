const { z } = require("zod");

exports.addToCartSchema = z.object({
  body: z.object({
    productId: z.string().length(24),
    quantity: z.number().int().min(1).max(10),
  }),
});
