const Joi = require("joi");

const addBookValidator = async (req, res, next) => {
  try {
    await Joi.object({
      title: Joi.string().required(),
      author: Joi.string().required(),
      synopsis: Joi.string().required(),
      edition: Joi.string().required(),
      price: Joi.string().required(),
      offsale: Joi.string().optional(),
      ebook: Joi.boolean().required(),
    }).validateAsync(req.body);
    next();
  } catch (error) {
    console.log("error in addBookValidator");
    next(error);
  }
};


module.exports = { addBookValidator };
