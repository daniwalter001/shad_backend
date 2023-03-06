const Joi = require("joi");

const addCsValidator = async (req, res, next) => {
  console.log(req.body)
  try {
    await Joi.object({
      phone: Joi.string().required(),
      email: Joi.string().required().email().required().rule({
        message: "Email Invalide",
      }),
      designation: Joi.string().required(),
      address: Joi.string().required(),
      city: Joi.string().required(),
      authorisation_file_slug: Joi.string(),
    }).validateAsync(req.body);
    next();
  } catch (error) {
    console.log("error in csvalidator");
    next(error);
  }
};

module.exports = { addCsValidator };
