const { sequelize } = require("../db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { formatFirstname } = require("../helpers/functions");

const salt = parseInt(process.env.BCRYPT_SALT);

const addBuyer = async ({ name, email, phone, password }) => {
  console.log("in addBuyer");
  return await sequelize.models.Buyer.create({
    token: uuidv4(),
    lastname: lastname?.toUpperCase(),
    firstname: formatFirstname(firstname),
    email,
    phone,
    password: bcrypt.hashSync(password, salt),
  });
};

const checkBuyer = async ({ email }) => {
  console.log("in checkbuyer");
  return (
    (
      await sequelize.models.Buyer.findAll({
        where: {
          email: email,
        },
      })
    ).length === 0
  );
};

const checkBuyerByToken = async ({ token }) => {
  console.log("in checkbuyer by token");
  return (
    (
      await sequelize.models.Buyer.findAll({
        where: {
          token: token,
        },
      })
    ).length === 0
  );
};


const getBuyerByToken = async (buyerToken) => {
  let buyer = await sequelize.models.Buyer.findOne({
    where: {
      token: buyerToken,
    },
  });
  return buyer;
};

const updateBuyerByToken = async (buyerToken, data) => {
  let updated = await sequelize.models.Buyer.update(data, {
    where: {
      token: buyerToken,
    },
  });

  console.log(updated);
  return updated.length != 0 ? updated : false;
};

const deleteBuyerByToken = async (buyerToken, data) => {
  let deleted = await sequelize.models.Buyer.destroy({
    where: {
      token: buyerToken,
    },
  });

  console.log(deleted);
  return deleted.length != 0 ? deleted : false;
};

module.exports = {
  addBuyer,
  checkBuyer,
  checkBuyerByToken,
  getBuyerByToken,
  updateBuyerByToken,
  deleteBuyerByToken
};
