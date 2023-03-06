const Joi = require("joi");

const adminRegistrationValidator = async (req, res, next) => {
  try {
    await Joi.object({
      phone: Joi.string().required(),
      email: Joi.string().required().email().required().rule({
        message: "Email Invalide",
      }),
      lastname: Joi.string().required(),
      firstname: Joi.string().required(),
      password: Joi.string().required(),
    }).validateAsync(req.body);
    next();
  } catch (error) {
    console.log("error in adminRegistrationValidator");
    next(error);
  }
};

const adminLoginValidator = async (req, res, next) => {
  console.log(req.body)
  try {
    await Joi.object({
      email: Joi.string().required().email().rule({
        message: "Email Invalide",
      }),
      password: Joi.string().required(),
    }).validateAsync(req.body);
    next();
  } catch (error) {
    console.log("error in adminLoginValidator");
    next(error);
  }
};

module.exports = { adminLoginValidator, adminRegistrationValidator };
