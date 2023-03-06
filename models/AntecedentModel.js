const { DataTypes } = require("sequelize");
const { TYPE_ANTECEDENT } = require("../helpers/constants");

const defineAntecedentModel = (sequelize) =>
  sequelize.define("Antecedents", {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    type: {
      // POSSIBLE VALUE("familial", "medical"),
      type: DataTypes.STRING,
      defaultValue: TYPE_ANTECEDENT.MEDICAL,
      allowNull: false,
    },
    patient_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cs_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    consultation_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

module.exports = { defineAntecedentModel };
