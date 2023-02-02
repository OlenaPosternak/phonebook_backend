const { User } = require("../models/user");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  try {
    const { authorization = " " } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (!bearer || bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }

    const decodedToken = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decodedToken.id);
    if (!user || !user.token) {
      throw new Unauthorized("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "invalid token") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;
