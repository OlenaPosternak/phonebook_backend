const createError = require("http-errors");
const { Contact } = require("../models/contacts");

const getAll = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const result = await Contact.find({ owner: _id }, "name number");

    res.send(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const newContact = await Contact.create({ ...req.body, owner: _id });

    res.status(201).send(newContact);
  } catch (error) {
    next();
  }
};
const deleteContact = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const { _id } = req.user;
    const deletedContact = await Contact.findOneAndDelete({
      _id: contactId,
      owner: _id,
    });

    if (!deletedContact) {
      throw createError(404, `Current id does not exist ${id}`);
    }
    res.send({
      _id: deletedContact._id,
      name: deletedContact.name,
      number: deletedContact.number,
    });
  } catch (error) {
    next();
  }
};
module.exports = { getAll, addContact, deleteContact };
