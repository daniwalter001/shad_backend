const { sequelize } = require("../db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { formatFirstname } = require("../helpers/functions");
const salt = parseInt(process.env.BCRYPT_SALT);

const addPrescription = async ({
  patient_token,
  cs_token,
  user_token,
  startDate,
  endDate,
  notes,
  consultation_token,
  prescription,
  dosage
}) => {
  console.log("in add Prescription");
  return await sequelize.models.Prescriptions.create({
    token: uuidv4(),
    patient_token,
    cs_token,
    user_token,
    startDate,
    endDate,
    notes,
    consultation_token,
    prescription,
    dosage
  });
};

const checkPrescriptionBy = async (data = {}) => {
  console.log("in check Prescription");
  return (
    (
      await sequelize.models.Prescriptions.findAll({
        where: data,
      })
    ).length === 0
  );
};

const checkPrescriptionByToken = async (token) => {
  console.log("in check Prescription by token");
  return (
    (
      await sequelize.models.Prescriptions.findAll({
        where: {
          token
        },
      })
    ).length === 0
  );
};


const getPrescriptionByToken = async (token) => {
  let user = await sequelize.models.Prescriptions.findOne({
    where: {
      token,
    },
  });
  return user;
};

const updatePrescriptionByToken = async ({ token, data }) => {
  let updated = await sequelize.models.Prescriptions.update(data, {
    where: {
      token
    },
  });

  console.log(updated);
  return updated.length != 0 ? updated : false;
};

const deletePrescriptionByToken = async (token) => {
  let deleted = await sequelize.models.Prescriptions.destroy({
    where: {
      token
    },
  });
  console.log(deleted);
  return deleted.length != 0 ? deleted : false;
};

const deletePrescriptionWhere = async (data = {}) => {
  let deleted = await sequelize.models.Prescriptions.destroy({
    where: data,
  });
  console.log(deleted);
  return deleted.length != 0 ? deleted : false;
};

const getPrescriptionsByPraticienToken = async (user_token) => {
  console.log("in get Prescription by consultation ");
  let _ = await sequelize.models.Prescriptions.findAll({
    where: {
      user_token,
    },
  });

  return _;
};

const getPrescriptionsBy = async (data = {}) => {
  console.log("in get Prescriptions by ");
  let _ = await sequelize.models.Prescriptions.findAll({
    where: data,
  });

  return _;
};

module.exports = {
  addPrescription,
  checkPrescriptionBy,
  checkPrescriptionByToken,
  deletePrescriptionByToken,
  deletePrescriptionWhere,
  getPrescriptionByToken,
  getPrescriptionsBy,
  getPrescriptionsByPraticienToken,
  updatePrescriptionByToken,
};
