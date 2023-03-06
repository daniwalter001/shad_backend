const Joi = require("joi");

const addSharedFileValidator = async (req, res, next) => {
  try {
    await Joi.object({
      sender: Joi.string().required(),
      receiver: Joi.string().required(),
      description: Joi.string().required(),
      filename: Joi.string().required(),
    }).validateAsync(req.body);
    return next();
  } catch (error) {
    console.log("error in add SharedFile validator");
    return next(error);
  }
};

module.exports = { addSharedFileValidator };