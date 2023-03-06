const Joi = require("joi");
const email_reg = /^[a-zA-Z0-9._]*@[a-z]+\.[a-z]{1,8}$/

const addPatientValidator = async (req, res, next) => {
  try {
    await Joi.object({
      phone: Joi.string(),
      email: Joi.string().email().regex(email_reg).rule({
        message: "Email Invalide",
      }),
      address: Joi.string().required(),
      lastname: Joi.string().required(),
      firstname: Joi.string().required(),
      sexe: Joi.string().required(),
      blood: Joi.string(),
      rhesus: Joi.string(),
      birthdate: Joi.string().required(),
      birthplace: Joi.string().required(),
      country: Joi.string().required(),
      city: Joi.string().required(),
      emergency_name: Joi.string(),
      emergency_contact: Joi.string(),
      etat_civil: Joi.string().required(),
      profession: Joi.string().required(),
      working: Joi.boolean().required(),
      cs_creator_token: Joi.string().required(),
      cs_last_update_token: Joi.string().required(),
    }).validateAsync(req.body);
    return next();
  } catch (error) {
    console.log("error in add patient validator ");
    return next(error);
  }
};

const patientLoginValidator = async (req, res, next) => {
  try {
    await Joi.object({
      email: Joi.string().required().email().rule({
        message: "Email Invalide",
      }),
      password: Joi.string().required(),
    }).validateAsync(req.body);
    return next();
  } catch (error) {
    console.log("error in loginvalidator");
    return next(error);
  }
};

module.exports = { addPatientValidator, patientLoginValidator };
