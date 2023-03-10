const Joi = require("joi");

const addBuyerValidator = async (req, res, next) => {
  try {
    await Joi.object({
      phone: Joi.string().required(),
      email: Joi.string().required().email().required().rule({
        message: "Email Invalide",
      }),
      name: Joi.string().required(),
      password: Joi.string().required(),
    }).validateAsync(req.body);
    next();
  } catch (error) {
    console.log("error in addBuyerValidator");
    next(error);
  }
};

module.exports = { addBuyerValidator };
