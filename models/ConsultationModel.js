const { DataTypes } = require("sequelize");
const { CONSULTATION_STATUS } = require("../helpers/constants");

const defineConsultationModel = (sequelize) =>
  sequelize.define("Consultations", {

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      // POSSIBLE VALUE("ONGOING", "CLOSED"),
      type: DataTypes.STRING,
      defaultValue: CONSULTATION_STATUS.ONGOING,
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

    startDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    motif: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    tdrPaludisme: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    glycemie: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    temperature: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    cardiaqueFrequence: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rythmeCardiaque: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tensionArterielleRight: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tensionArterielleLeft: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hypothesis: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

  });

module.exports = { defineConsultationModel };
