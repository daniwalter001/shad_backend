const { sequelize } = require("../db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { formatFirstname } = require("../helpers/functions");
const salt = parseInt(process.env.BCRYPT_SALT)

const addUser = async ({
  lastname,
  firstname,
  email,
  phone,
  souscripteur_token,
  address,
  city,
  specialite,
  birthdate,
  nationality,
  cs_token
}) => {
  console.log("in adduser");
  return await sequelize.models.Users.create({
    token: uuidv4(),
    password: bcrypt.hashSync(`${lastname?.toLowerCase()}${email}`, salt),
    lastname: lastname?.toUpperCase(),
    firstname: formatFirstname(firstname),
    email,
    phone,
    souscripteur_token,
    address,
    city,
    specialite,
    birthdate,
    nationality,
    cs_token
  });
};

const checkUser = async ({ email }) => {
  console.log("in checkuser");
  return (
    (
      await sequelize.models.Users.findAll({
        where: {
          email: email,
        },
      })
    ).length === 0
  );
};

const checkUserByToken = async ({ token }) => {
  console.log("in checkuser by token");
  return (
    (
      await sequelize.models.Users.findAll({
        where: {
          token: token,
        },
      })
    ).length === 0
  );
};

const authUser = async ({ email, password }) => {
  console.log("in authUser");
  try {
    let user = await sequelize.models.Users.findOne({
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

const getUserByToken = async (userToken) => {
  let user = await sequelize.models.Users.findOne({
    where: {
      token: userToken,
    },
  });
  return user;
};

const updateUserByToken = async (userToken, data) => {
  let updated = await sequelize.models.Users.update(data, {
    where: {
      token: userToken,
    },
  });

  console.log(updated);
  return updated.length != 0 ? updated : false;
};

const deleteUserByToken = async (userToken) => {
  let deleted = await sequelize.models.Users.destroy({
    where: {
      token: userToken,
    },
  });
  console.log(deleted);
  return deleted.length != 0 ? deleted : false;
};


const getUserByCsToken = async (csToken) => {
  let user = await sequelize.models.Users.findOne({
    where: {
      cs_token: csToken,
    },
  });
  return user;
};


const getUsersBySouscripteurToken = async (souscripteur_token) => {
  console.log("in get user by s token");
  let _ = await sequelize.models.Users.findAll({
    where: {
      souscripteur_token
    },
    order: [
      ["createdAt", "DESC"]
    ]
  })

  return _
};

const getUsersBy = async (data = {}) => {
  console.log("in get user by s token");
  let _ = await sequelize.models.Users.findAll({
    where: {
      data
    },
    order: [
      ["createdAt", "DESC"]
    ]
  })

  return _
};



module.exports = {
  addUser,
  authUser,
  checkUser,
  checkUserByToken,
  deleteUserByToken,
  getUserByToken,
  getUserByCsToken,
  updateUserByToken,
  getUsersBy, getUsersBySouscripteurToken
};
