const { DataTypes } = require("sequelize");

const definePrescriptionModel = (sequelize) =>
  sequelize.define("Prescriptions", {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
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

    startDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    prescription: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dosage: {
      type: DataTypes.STRING,
      allowNull: true,
    },

  });

module.exports = { definePrescriptionModel };
