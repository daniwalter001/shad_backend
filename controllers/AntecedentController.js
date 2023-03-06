const { sequelize } = require("../db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { formatFirstname } = require("../helpers/functions");
const salt = parseInt(process.env.BCRYPT_SALT);

const addAntecedent = async ({
  type,
  patient_token,
  cs_token,
  user_token,
  consultation_token,
  details,
}) => {
  console.log("in add antecedent");
  return await sequelize.models.Antecedents.create({
    token: uuidv4(),
    type,
    patient_token,
    cs_token,
    user_token,
    consultation_token,
    details,
  });
};

const checkAntecedentBy = async (data = {}) => {
  console.log("in check antecedent");
  return (
    (
      await sequelize.models.Antecedents.findAll({
        where: data,
      })
    ).length === 0
  );
};

const checkAntecedentByToken = async (token) => {
  console.log("in check antecedentby token");
  return (
    (
      await sequelize.models.Antecedents.findAll({
        where: {
          token
        },
      })
    ).length === 0
  );
};

const getAntecedentByToken = async (token) => {
  let antecedent = await sequelize.models.Antecedents.findOne({
    where: {
      token,
    },
  });
  return antecedent;
};

const updateAntecedentByToken = async ({ token, data }) => {
  let updated = await sequelize.models.Antecedents.update(data, {
    where: {
      token
    },
  });

  console.log(updated);
  return updated.length != 0 ? updated : false;
};

const deleteAntecedentByToken = async (token) => {
  let deleted = await sequelize.models.Antecedents.destroy({
    where: {
      token
    },
  });
  console.log(deleted);
  return deleted.length != 0 ? deleted : false;
};

const deleteAntecedentWhere = async (data = {}) => {
  let deleted = await sequelize.models.Antecedents.destroy({
    where: data
  });
  console.log(deleted);
  return deleted.length != 0 ? deleted : false;
};

const getAntecedentsByPatientToken = async (patient_token) => {
  console.log("in get antecedentby patient token");
  let _ = await sequelize.models.Antecedents.findAll({
    where: {
      patient_token,
    },
    order: [
      ["createdAt", "DESC"]
    ]
  });
  return _.map(__ => __);

};

const getAntecedentsByConsultationToken = async (consultation_token) => {
  console.log("in get antecedentby consultation token");
  let _ = await sequelize.models.Antecedents.findAll({
    where: {
      consultation_token,
    },
    order: [
      ["createdAt", "DESC"]
    ]
  });
  return _.map(__ => __);

};

const getAntecedentsBy = async (data = {}) => {
  console.log("in get user by data");
  let _ = await sequelize.models.Antecedents.findAll({
    where: data,
    order: [
      ["createdAt", "DESC"]
    ]
  });

  return _.map(__ => __);
};

const getAllAntecedents = async (data = {}) => {
  console.log("in get user by data");
  let _ = await sequelize.models.Antecedents.findAll({
    order: [
      ["createdAt", "DESC"]
    ]
  });

  return _.map(__ => __);
};

module.exports = {
  addAntecedent,
  checkAntecedentBy,
  checkAntecedentByToken,
  deleteAntecedentByToken,
  deleteAntecedentWhere,
  getAntecedentByToken,
  getAntecedentsBy,
  getAntecedentsByPatientToken,
  updateAntecedentByToken,
  getAntecedentsByConsultationToken,
  getAllAntecedents
};
