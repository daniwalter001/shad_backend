const { sequelize } = require("../db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const salt = parseInt(process.env.BCRYPT_SALT);

const addCs = async ({
  designation,
  email,
  phone,
  city,
  address,
  authorisation_file_slug,
  authorisation_file_link
}) => {
  console.log("in adduser");
  console.log(authorisation_file_slug)
  return await sequelize.models.Cs.create({
    token: uuidv4(),
    designation,
    email,
    phone,
    city,
    address,
    authorisation_file_slug,
    authorisation_file_link
  });
};

const checkCs = async ({ email }) => {
  console.log("in checkCs");
  return (
    (
      await sequelize.models.Cs.findAll({
        where: {
          email: email,
        },
      })
    ).length === 0
  );
};

const checkCsByToken = async ({ token }) => {
  console.log("in checkCs by token");
  return (
    (
      await sequelize.models.Cs.findAll({
        where: {
          token
        },
      })
    ).length === 0
  );
};

const getCsByToken = async (csToken) => {
  let cs = await sequelize.models.Cs.findOne({
    where: {
      token: csToken,
    },
  });
  return cs;
};

const getCsByEmail = async (email) => {
  let cs = await sequelize.models.Cs.findOne({
    where: {
      email
    },
  });
  return cs
};

const updateCsByToken = async (csToken, data) => {
  let updated = await sequelize.models.Cs.update(data, {
    where: {
      token: csToken,
    },
  });

  console.log(updated);
  return updated.length != 0 ? updated : false;
};

const deleteCsByToken = async (csToken) => {
  let deleted = await sequelize.models.Cs.destroy({
    where: {
      token: csToken,
    },
  });
  console.log(deleted);
  return deleted.length != 0 ? deleted : false;
};

const getAllCs = async () => {
  let all = await sequelize.models.Cs.findAll();
  return all.map(one => one)
};

module.exports = {
  addCs,
  checkCs,
  checkCsByToken,
  getCsByToken,
  updateCsByToken,
  getCsByEmail,
  deleteCsByToken,
  getAllCs
};
