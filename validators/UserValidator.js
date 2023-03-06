const Joi = require("joi");

const registrationValidator = async (req, res, next) => {
  try {
    await Joi.object({
      phone: Joi.string().required(),
      email: Joi.string().required().email().required().rule({
        message: "Email Invalide",
      }),
      lastname: Joi.string().required(),
      firstname: Joi.string().required(),
      souscripteur_token: Joi.string().required(),
      cs_token: Joi.string().required(),
      address: Joi.string().required(),
      city: Joi.string().required(),
      specialite: Joi.string().required(),
      nationality: Joi.string().required(),
      birthdate: Joi.string().required(),

    }).validateAsync(req.body);
    return next();
  } catch (error) {
    console.log("error in registervalidator");
    return next(error);
  }
};

const loginValidator = async (req, res, next) => {
  try {
    await Joi.object({
      email: Joi.string().required().email().rule({
        message: "Email Invalide",
      }),
      password: Joi.string().required(),
    }).validateAsync(req.body);
    return next();
  } catch (error) {
    console.log("error in patient loginvalidator");
    return next(error);
  }
};

module.exports = { loginValidator, registrationValidator };
