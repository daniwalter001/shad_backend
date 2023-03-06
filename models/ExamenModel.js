const { DataTypes } = require("sequelize");

const defineExamenModel = (sequelize) =>
  sequelize.define("Examens", {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    prelevelement_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    analyse_date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    results: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    observations: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cs_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    consultation_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    patient_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

module.exports = { defineExamenModel };
