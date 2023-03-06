const Joi = require("joi");

const addSouscriptionValidator = async (req, res, next) => {
  try {
    await Joi.object({
      cs_token: Joi.string().required(),
      souscripteur_token: Joi.string().required(),
      souscription_type_token: Joi.string().required(),
      activationDate: Joi.string().required(),
    }).validateAsync(req.body);
    return next();
  } catch (error) {
    console.log("error in addsousvalidator");
    return next(error);
  }
};

module.exports = { addSouscriptionValidator };
