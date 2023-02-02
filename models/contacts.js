const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactsSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      unique: [true, "Contact with current name already exists"],
    },
    number: {
      type: String,
      required: [true, "Set phone number for contact"],
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const hadlerError = (error, data, next) => {
  const { name, code } = error;
  if (name === "MongoServerError" && code === 11000) {
    error.status = 409;
  } else {
    error.status = 400;
  }
  next();
};

contactsSchema.post("save", hadlerError);

const Contact = model("contact", contactsSchema);

const contactsSchemaJoi = Joi.object({
  name: Joi.string().required(),
  number: Joi.string()
    .pattern(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
    )
    .required(),
});

module.exports = {
  Contact,
  contactsSchemaJoi,
};
