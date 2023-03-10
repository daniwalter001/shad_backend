const { sequelize } = require("../db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { formatFirstname } = require("../helpers/functions");

const salt = parseInt(process.env.BCRYPT_SALT);

const addAdmin = async ({ name, email, phone, password }) => {
  console.log("in addadmin");
  return await sequelize.models.Admin.create({
    token: uuidv4(),
    name,
    email,
    phone,
    password: bcrypt.hashSync(password, salt),
  });
};

const checkAdmin = async ({ email }) => {
  console.log("in checkadmin");
  return (
    (
      await sequelize.models.Admin.findAll({
        where: {
          email: email,
        },
      })
    ).length === 0
  );
};

const checkAdminByToken = async ({ token }) => {
  console.log("in checkadmin by token");
  return (
    (
      await sequelize.models.Admin.findAll({
        where: {
          token: token,
        },
      })
    ).length === 0
  );
};

const authAdmin = async ({ email, password }) => {
  console.log("in authAdmin");
  try {
    let admin = await sequelize.models.Admin.findOne({
      where: {
        email: email,
      },
    });
    if (admin != null) {
      return bcrypt.compareSync(password, admin.password) ? admin : false;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getAdminByToken = async (adminToken) => {
  let admin = await sequelize.models.Admin.findOne({
    where: {
      token: adminToken,
    },
  });
  return admin;
};

const updateAdminByToken = async (adminToken, data) => {
  let updated = await sequelize.models.Admin.update(data, {
    where: {
      token: adminToken,
    },
  });

  console.log(updated);
  return updated.length != 0 ? updated : false;
};

module.exports = {
  addAdmin,
  checkAdmin,
  checkAdminByToken,
  authAdmin,
  getAdminByToken,
  updateAdminByToken,
};
