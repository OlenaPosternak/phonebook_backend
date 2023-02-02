const express = require("express");

const {getAll, addContact,deleteContact} = require("../controllers/contact")

const { validation, isValidId , auth } = require("../middlewares");
const { contactsSchemaJoi } = require("../models/contacts");
const validateMiddleware = validation(contactsSchemaJoi);

const router = express.Router();

router.get("/",auth, getAll)
router.post("/",auth, validateMiddleware, addContact)
router.delete('/:contactId', auth, isValidId, deleteContact)

module.exports = router