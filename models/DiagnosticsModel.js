const { DataTypes } = require("sequelize");

const defineDiagnosticModel = (sequelize) =>
  sequelize.define("Diagnostics", {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    status: {
      // POSSIBLE VALUE("Grave", "Moyen","Benin"),
      type: DataTypes.STRING,
      defaultValue: "Benin",
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
    consultation_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    certitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chronic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

module.exports = { defineDiagnosticModel };
