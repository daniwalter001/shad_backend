const Joi = require("joi");

const addSouscripteurValidator = async (req, res, next) => {
  try {
    await Joi.object({
      phone: Joi.string().required(),
      email: Joi.string().required().email().required().rule({
        message: "Email Invalide",
      }),
      lastname: Joi.string().required(),
      firstname: Joi.string().required(),
      password: Joi.string().required(),
      role: Joi.string().required(),
      address: Joi.string(),
    }).validateAsync(req.body);
    return next();
  } catch (error) {
    console.log("error in registervalidator");
    return next(error);
  }
};

const loginSouscripteurValidator = async (req, res, next) => {
  try {
    await Joi.object({
      email: Joi.string().required().email().required().rule({
        message: "Email Invalide",
      }),
      password: Joi.string().required(),
    }).validateAsync(req.body);
    return next();
  } catch (error) {
    console.log("error in registervalidator");
    return next(error);
  }
};


module.exports = { addSouscripteurValidator, loginSouscripteurValidator };
