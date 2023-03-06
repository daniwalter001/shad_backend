const Joi = require("joi");

const addExamenValidator = async (req, res, next) => {
  try {
    await Joi.object({
      designation: Joi.string().required(),
      description: Joi.string().allow(''),
      prelevelement_type: Joi.string().required(),
      analyse_date: Joi.string().allow(''),
      results: Joi.string().allow(''),
      observations: Joi.string().allow(''),
      cs_token: Joi.string().required(),
      consultation_token: Joi.string().required(),
      user_token: Joi.string().required(),
      patient_token: Joi.string().required()
    }).validateAsync(req.body);
    return next();
  } catch (error) {
    console.log("error in add examen validator");
    return next(error);
  }
};

module.exports = { addExamenValidator };