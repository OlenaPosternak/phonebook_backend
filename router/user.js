const express = require("express");

const router = express.Router();

const { schemas } = require("../models/user");

const { validation, auth } = require("../middlewares");
//auth - перевірка токена на валідність

const validateREgisterMiddleware = validation(schemas.userRegisterSchemaJoi);
const validateLoginMiddleware = validation(schemas.userLoginSchemaJoi);

const { register, login, logout, current } = require("../controllers/user");

router.post("/signup", validateREgisterMiddleware, register);
router.post("/login", validateLoginMiddleware, login);

router.get("/current", auth, current);
router.post("/logout", auth, logout);

module.exports = router;
