const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for user"],
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

const userRegisterSchemaJoi = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
});

const userLoginSchemaJoi = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const schemas = {
  userRegisterSchemaJoi,
  userLoginSchemaJoi,
};

module.exports = {
  User,
  schemas,
};
