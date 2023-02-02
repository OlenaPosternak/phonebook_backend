const createError = require("http-errors");

const validation = (shema) => {
  return (req, res, next) => {
    const { error } = shema.validate(req.body);
    if (error) {
         throw createError(400, error.details[0].message);
    }
    next();
  };
};

module.exports = validation;
