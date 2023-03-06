const { sequelize } = require("../db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { formatFirstname } = require("../helpers/functions");
const salt = parseInt(process.env.BCRYPT_SALT);

const addExamen = async ({
  designation,
  prelevelement_type,
  analyse_date,
  description,
  results,
  observations,
  cs_token,
  consultation_token,
  user_token,
  patient_token
}) => {
  console.log("in add examen");
  return await sequelize.models.Examens.create({
    token: uuidv4(),
    designation,
    prelevelement_type,
    analyse_date,
    description,
    results,
    observations,
    cs_token,
    consultation_token,
    user_token,
    patient_token,
  });
};

const checkExamenBy = async (data = {}) => {
  console.log("in check examen");
  return (
    (
      await sequelize.models.Examens.findAll({
        where: data,
      })
    ).length === 0
  );
};

const checkExamenByToken = async (token) => {
  console.log("in check examen by token");
  return (
    (
      await sequelize.models.Examens.findAll({
        where: {
          token
        },
      })
    ).length === 0
  );
};

const getExamenByToken = async (token) => {
  let examen = await sequelize.models.Examens.findOne({
    where: {
      token,
    },
  });
  return examen;
};

const updateExamenByToken = async ({ token, data }) => {
  let updated = await sequelize.models.Examens.update(data, {
    where: {
      token
    },
  });

  console.log(updated);
  return updated.length != 0 ? updated : false;
};

const deleteExamenByToken = async (token) => {
  let deleted = await sequelize.models.Examens.destroy({
    where: {
      token
    },
  });
  console.log(deleted);
  return deleted.length != 0 ? deleted : false;
};

const deleteExamenWhere = async (data = {}) => {
  let deleted = await sequelize.models.Examens.destroy({
    where: data,
  });
  console.log(deleted);
  return deleted.length != 0 ? deleted : false;
};

const getExamensByConsultationToken = async (consultation_token) => {
  console.log("in get examen by consultation ");
  let _ = await sequelize.models.Examens.findAll({
    where: {
      consultation_token,
    },
  });

  return _.map((examen) => examen);

};

const getExamenBy = async (data = {}) => {
  console.log("in get Examen by ");
  let _ = await sequelize.models.Examens.findAll({
    where: data,
  });

  return _.map((examen) => examen);

};

module.exports = {
  addExamen,
  checkExamenBy,
  checkExamenByToken,
  deleteExamenByToken,
  deleteExamenWhere,
  getExamenByToken,
  getExamenBy,
  getExamensByConsultationToken,
  updateExamenByToken,
};
