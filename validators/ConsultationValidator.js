const Joi = require("joi");

const addConsultationValidator = async (req, res, next) => {
  try {
    await Joi.object({
      patient_token: Joi.string().required(),
      cs_token: Joi.string().required(),
      user_token: Joi.string().required(),
      startDate: Joi.string().required(),
      endDate: Joi.string().allow(''),
      motif: Joi.string().allow(''),
      tdrPaludisme: Joi.string().allow(''),
      glycemie: Joi.string().allow(''),
      temperature: Joi.string().allow(''),
      weight: Joi.string().allow(''),
      height: Joi.string().allow(''),
      cardiaqueFrequence: Joi.string().allow(''),
      rythmeCardiaque: Joi.string().allow(''),
      tensionArterielleRight: Joi.string().allow(''),
      tensionArterielleLeft: Joi.string().allow(''),
      hypothesis: Joi.string().allow(''),
    }).validateAsync(req.body);
    return next();
  } catch (error) {
    console.log("error in add consultation validator");
    return next(error);
  }
};

module.exports = { addConsultationValidator };