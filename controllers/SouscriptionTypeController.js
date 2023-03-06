const { sequelize } = require("../db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const salt = parseInt(process.env.BCRYPT_SALT);

const addSouscriptionType = async ({ type, sub_account_number }) => {
  console.log("in addsouscripiton");
  return await sequelize.models.TypeSouscriptions.create({
    token: uuidv4(),
    type,
    sub_account_number,
  });
};


const checkSouscriptionType = async (data = {}) => {
  console.log("in checkuser by token");
  return (
    (
      await sequelize.models.TypeSouscriptions.findAll({
        where: {
          ...data
        },
      })
    ).length === 0
  );
};

const checkSouscriptionTypeByToken = async (token) => {
  console.log("in checkuser by token");
  return (
    (
      await sequelize.models.TypeSouscriptions.findAll({
        where: {
          token,
        },
      })
    ).length === 0
  );
};

const getSouscriptionTypeByToken = async (type_token) => {
  console.log({ type_token })
  let sous_type = await sequelize.models.TypeSouscriptions.findOne({
    where: {
      token: type_token,
    },
  });

  // return sous_type.map((type) => type);
  return sous_type
};

const getSouscriptionTypeBy = async (data = {}) => {
  console.log({ type_token })
  let sous_type = await sequelize.models.TypeSouscriptions.findAll({
    where: data,
  });

  console.log(sous_type);
  // return sous_type.map((type) => type);
  return sous_type
};

const getSouscriptionTypeByType = async (type) => {
  let sous_types = await sequelize.models.TypeSouscriptions.findAll({
    where: {
      type
    },
  });

  console.log(sous_types);
  // return sous_type.map((type) => type);
  return sous_types
};

const getSouscriptionTypes = async () => {
  let sous_types = await sequelize.models.TypeSouscriptions.findAll();

  console.log(sous_types);
  // return sous_type.map((type) => type);
  return sous_types
};

module.exports = {
  addSouscriptionType,
  checkSouscriptionType,
  checkSouscriptionTypeByToken,
  getSouscriptionTypeByToken,
  getSouscriptionTypeByType,
  getSouscriptionTypes,
  getSouscriptionTypeBy
};
