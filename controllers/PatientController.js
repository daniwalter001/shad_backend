const { sequelize } = require("../db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const customId = require("custom-id");
const { formatFirstname } = require("../helpers/functions");
const salt = parseInt(process.env.BCRYPT_SALT);

const addPatient = async ({
  lastname,
  firstname,
  phone,
  address,
  birthdate,
  birthplace,
  country,
  city,
  email,
  rhesus,
  blood,
  sexe,
  etat_civil,
  profession,
  working,
  emergency_name,
  emergency_contact,
  cs_creator_token,
  cs_last_update_token
}) => {
  console.log("in add patient");
  return await sequelize.models.Patients.create({
    uid: customId({
      name: lastname?.concat(firstname) ?? "",
      email: email ?? "",
      lowerCase: true
    }),
    token: uuidv4(),
    lastname: lastname?.toUpperCase(),
    firstname: formatFirstname(firstname),
    password: bcrypt.hashSync(`${lastname?.toLowerCase()}${email}`, salt),
    phone,
    address,
    birthdate,
    birthplace,
    country,
    city,
    email,
    sexe,
    rhesus,
    blood,
    etat_civil,
    profession,
    working,
    emergency_name,
    emergency_contact,
    cs_creator_token,
    cs_last_update_token
  });
};

const checkPatient = async ({ lastname, firstname, email, country, phone }) => {
  // let { lastname, firstname, email, country, phone } = data
  console.log("in checkpatient");
  return (
    (
      await sequelize.models.Patients.findAll({
        where: {
          lastname: lastname?.toUpperCase(),
          firstname: formatFirstname(firstname),
          email,
          phone
        },
      })
    ).length === 0
  );
};

const checkPatientByToken = async (token) => {
  console.log("in checkpatient by token");
  return (
    (
      await sequelize.models.Patients.findAll({
        where: {
          token: token,
        },
      })
    ).length === 0
  );
};

const authPatient = async ({ email, password }) => {
  console.log("in authUser");
  try {
    let patient = await sequelize.models.Patients.findOne({
      where: {
        email: email,
      },
    });
    if (patient != null) {
      return bcrypt.compareSync(password, patient.password) ? patient : false;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getPatientByToken = async (token) => {
  let patient = await sequelize.models.Patients.findOne({
    where: {
      token: token,
    },
  });
  return patient;
};

const getPatientsByCsToken = async (cs_token) => {
  let patients = await sequelize.models.Patients.findAll({
    where: {
      cs_creator_token: cs_token,
    },
    order: [
      ["lastname", "ASC"]
    ]
  });
  return patients.map(patient => patient)
};

const updatePatientByToken = async (token = "", data = {}) => {
  let updated = await sequelize.models.Patients.update(data, {
    where: {
      token: token,
    },
  });

  return updated.length != 0 ? updated : false;
};

const deletePatientByToken = async (userToken) => {
  let deleted = await sequelize.models.Patients.destroy({
    where: {
      token: userToken,
    },
  });
  return deleted.length != 0 ? deleted : false;
};

const getPatients = async () => {
  let _ = await sequelize.models.Patients.findAll({
    order: [
      ["lastname", "ASC"]
    ]
  });
  return _.map((user) => user);
};

module.exports = {
  addPatient,
  checkPatient,
  checkPatientByToken,
  deletePatientByToken,
  getPatients,
  getPatientByToken,
  updatePatientByToken,
  authPatient,
  getPatientsByCsToken
};
