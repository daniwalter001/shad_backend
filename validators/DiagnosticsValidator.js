const Joi = require("joi");

const addDiagnosticsValidator = async (req, res, next) => {
  try {
    await Joi.object({
      patient_token: Joi.string().required(),
      cs_token: Joi.string().required(),
      user_token: Joi.string().required(),
      consultation_token: Joi.string().required(),
      certitude: Joi.string().required(),
      chronic: Joi.boolean().required(),
      label: Joi.string().required(),
      description: Joi.string().allow(''),
      status: Joi.string().required(),
    }).validateAsync(req.body);
    return next();
  } catch (error) {
    console.log("error in add diagnostics validator");
    return next(error);
  }
};

module.exports = { addDiagnosticsValidator };