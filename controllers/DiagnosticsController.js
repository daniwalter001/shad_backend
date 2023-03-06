const { sequelize } = require("../db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { formatFirstname } = require("../helpers/functions");
const salt = parseInt(process.env.BCRYPT_SALT);

const addDiagnostics = async ({
  status,
  patient_token,
  cs_token,
  consultation_token,
  user_token,
  certitude,
  chronic,
  label,
  description
}) => {
  console.log("in add diagnostic");
  return await sequelize.models.Diagnostics.create({
    token: uuidv4(),
    status,
    patient_token,
    cs_token,
    consultation_token,
    user_token,
    certitude,
    chronic,
    label,
    description
  });
};

const checkDiagnosticsBy = async (data = {}) => {
  console.log("in check diagnostic");
  return (
    (
      await sequelize.models.Diagnostics.findAll({
        where: data,
      })
    ).length === 0
  );
};

const checkDiagnosticsByToken = async (token) => {
  console.log("in check diagnostic by token");
  return (
    (
      await sequelize.models.Diagnostics.findAll({
        where: {
          token
        },
      })
    ).length === 0
  );
};

const getDiagnosticsByToken = async (token) => {
  let user = await sequelize.models.Diagnostics.findOne({
    where: {
      token,
    },
  });
  return user;
};

const updateDiagnosticsByToken = async ({ token, data }) => {
  let updated = await sequelize.models.Diagnostics.update(data, {
    where: {
      token
    },
  });

  console.log(updated);
  return updated.length != 0 ? updated : false;
};

const deleteDiagnosticsByToken = async (token) => {
  let deleted = await sequelize.models.Diagnostics.destroy({
    where: {
      token
    },
  });
  console.log(deleted);
  return deleted.length != 0 ? deleted : false;
};

const deleteDiagnosticsWhere = async (data = {}) => {
  let deleted = await sequelize.models.Diagnostics.destroy({
    where: data,
  });
  console.log(deleted);
  return deleted.length != 0 ? deleted : false;
};

const getDiagnosticsByConsultationToken = async (consultation_token) => {
  console.log("in get diagnostic by consultation ");
  let _ = await sequelize.models.Diagnostics.findAll({
    where: {
      consultation_token,
      order: [
        ["createdAt", "DESC"]
      ]
    },
  });

  return _;
};

const getDiagnosticsBy = async (data = {}) => {
  console.log("in get diagnostics by ");
  let _ = await sequelize.models.Diagnostics.findAll({
    where: data,
    order: [
      ["createdAt", "DESC"]
    ]
  });

  return _;
};

module.exports = {
  addDiagnostics,
  checkDiagnosticsBy,
  checkDiagnosticsByToken,
  deleteDiagnosticsByToken,
  deleteDiagnosticsWhere,
  getDiagnosticsByToken,
  getDiagnosticsBy,
  getDiagnosticsByConsultationToken,
  updateDiagnosticsByToken,
};
