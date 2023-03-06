const { sequelize } = require("../db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { formatFirstname } = require("../helpers/functions");
const salt = +process.env.BCRYPT_SALT;

const addSouscripteur = async ({
  lastname,
  firstname,
  email,
  phone,
  password,
  address,
  role,
}) => {
  console.log("in addsous");
  return await sequelize.models.Souscripteurs.create({
    token: uuidv4(),
    lastname: lastname?.toUpperCase(),
    firstname: formatFirstname(firstname),
    email,
    phone,
    password: bcrypt.hashSync(password, salt),
    address,
    role,
  });
};

const checkSouscripteur = async ({ email }) => {
  console.log("in checkuser");
  return (
    (
      await sequelize.models.Souscripteurs.findAll({
        where: {
          email: email,
        },
      })
    ).length === 0
  );
};

const checkSouscripteurByToken = async ({ token }) => {
  console.log("in checksous-eur by token");
  return (
    (
      await sequelize.models.Souscripteurs.findAll({
        where: {
          token
        },
      })
    ).length === 0
  );
};

const authSouscripteur = async ({ email, password }) => {
  console.log("in authsous-eur");
  try {
    let user = await sequelize.models.Souscripteurs.findOne({
      where: {
        email: email,
      },
    });
    if (user != null) {
      return bcrypt.compareSync(password, user.password) ? user : false;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};


const getSouscripteurByToken = async (token) => {
  let user = await sequelize.models.Souscripteurs.findOne({
    where: {
      token
    },
  });
  return user;
};

const getSouscripteurBy = async (data = {}) => {
  let user = await sequelize.models.Souscripteurs.findOne({
    where: {
      data
    },
  });
  return user;
};

const updateSouscripteurByToken = async (token, data) => {
  let updated = await sequelize.models.Souscripteurs.update(data, {
    where: {
      token
    },
  });

  console.log(updated);
  return updated.length != 0 ? updated : false;
};

const deleteSouscripteurByToken = async (token) => {
  let deleted = await sequelize.models.Souscripteurs.destroy({
    where: {
      token
    },
  });
  console.log(deleted);
  return deleted.length != 0 ? deleted : false;
};

const getAllSouscripteurs = async () => {
  let all = await sequelize.models.Souscripteurs.findAll();
  return all.map((one) => one);
};

module.exports = {
  addSouscripteur,
  authSouscripteur,
  checkSouscripteur,
  checkSouscripteurByToken,
  deleteSouscripteurByToken,
  getSouscripteurByToken,
  updateSouscripteurByToken,
  getSouscripteurBy,
  getAllSouscripteurs,
  getAllSouscripteurs
};