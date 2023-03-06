const { sequelize } = require("../db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { formatFirstname } = require("../helpers/functions");
const { CONSULTATION_STATUS } = require("../helpers/constants");
const salt = parseInt(process.env.BCRYPT_SALT);

const addConsultation = async ({
  patient_token,
  cs_token,
  user_token,
  startDate,
  endDate,
  motif,
  tdrPaludisme,
  glycemie,
  temperature,
  weight,
  height,
  cardiaqueFrequence,
  rythmeCardiaque,
  tensionArterielleRight,
  tensionArterielleLeft,
  hypothesis,
}) => {
  console.log("in add consultation");
  return await sequelize.models.Consultations.create({
    token: uuidv4(),
    patient_token,
    cs_token,
    user_token,
    startDate,
    endDate,
    motif,
    tdrPaludisme,
    glycemie,
    temperature,
    weight,
    height,
    cardiaqueFrequence,
    tensionArterielleRight,
    tensionArterielleLeft,
    hypothesis,
    rythmeCardiaque
  });
};

const checkConsultationBy = async (data = {}) => {
  console.log("in check consultation");
  return (
    (
      await sequelize.models.Consultations.findAll({
        where: data,
      })
    ).length === 0
  );
};

const checkConsultationByToken = async (token) => {
  console.log("in check consultation by token");
  return (
    (
      await sequelize.models.Consultations.findAll({
        where: {
          token
        },
      })
    ).length === 0
  );
};


const getConsultationByToken = async (token) => {
  let user = await sequelize.models.Consultations.findOne({
    where: {
      token,
    },
  });
  return user;
};

const getConsultationByUID = async (uid) => {
  let user = await sequelize.models.Consultations.findOne({
    where: {
      uid,
    },
  });
  return user;
};

const updateConsultationByToken = async ({ token, data }) => {
  let updated = await sequelize.models.Consultations.update(data, {
    where: {
      token
    },
  });

  console.log(updated);
  return updated.length != 0 ? updated : false;
};

const closeConsultation = async (token) => {
  let close = await sequelize.models.Consultations.update({
    status: CONSULTATION_STATUS.CLOSED
  }, {
    where: {
      token
    },
  });

  console.log(close);
  return close.length != 0 ? close : false;
};

const deleteConsultationByToken = async (token) => {
  let deleted = await sequelize.models.Consultations.destroy({
    where: {
      token
    },
  });
  console.log(deleted);
  return deleted.length != 0 ? deleted : false;
};


const getConsultationsByPraticienToken = async (user_token) => {
  console.log("in get consultation by user token");
  let _ = await sequelize.models.Consultations.findAll({
    where: {
      user_token,
    },
    order: [
      ["id", "DESC"]
    ]
  });

  return _;
};

const getConsultationsBy = async (data = {}) => {
  console.log("in get user by consultation token");
  let _ = await sequelize.models.Consultations.findAll({
    where: data,
    order: [
      ["id", "DESC"]
    ]
  });

  return _.map(__ => __)
};

module.exports = {
  addConsultation,
  checkConsultationBy,
  checkConsultationByToken,
  deleteConsultationByToken,
  getConsultationByToken,
  getConsultationsBy,
  getConsultationsByPraticienToken,
  updateConsultationByToken,
  getConsultationByUID,
  closeConsultation
};
