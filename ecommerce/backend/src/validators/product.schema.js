const { z } = require("zod");

exports.createProductSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    price: z.number().positive(),
    stock: z.number().int().min(0),
    category: z.string(),
    description: z.string().min(10),
  }),
});
