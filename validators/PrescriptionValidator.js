const Joi = require("joi");

const addPrescriptionValidator = async (req, res, next) => {
  try {
    await Joi.object({
      patient_token: Joi.string().required(),
      cs_token: Joi.string().required(),
      user_token: Joi.string().required(),
      consultation_token: Joi.string().required(),
      startDate: Joi.string().required(),
      endDate: Joi.string().required(),
      dosage: Joi.string().required(),
      prescription: Joi.string().required(),
      notes: Joi.string().allow('')
    }).validateAsync(req.body);
    return next();
  } catch (error) {
    console.log("error in add Prescription validator");
    return next(error);
  }
};

module.exports = { addPrescriptionValidator };