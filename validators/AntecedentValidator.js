const Joi = require("joi");

const addAntecedentValidator = async (req, res, next) => {
  try {
    await Joi.object({
      patient_token: Joi.string().required(),
      cs_token: Joi.string().required(),
      user_token: Joi.string().required(),
      consultation_token: Joi.string().required(),
      type: Joi.string().required(),
      details: Joi.string().allow(''),
    }).validateAsync(req.body);
    return next();
  } catch (error) {
    console.log("error in add antecedent validator");
    return next(error);
  }
};

module.exports = { addAntecedentValidator };