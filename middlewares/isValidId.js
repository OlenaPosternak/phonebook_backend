const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const id = req.params.contactId;
  const isCorrectId = isValidObjectId(id);
  if (!isCorrectId) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  next();
};

module.exports = isValidId;
