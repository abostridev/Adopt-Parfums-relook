const { ZodError } = require("zod");

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        message: "Données invalides",
        errors: err.errors.map(e => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
    }
    next(err);
  }
};

module.exports = validate;
