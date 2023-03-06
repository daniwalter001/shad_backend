const { DataTypes } = require("sequelize");

const definePatientModel = (sequelize) =>
  sequelize.define("Patients", {
    uid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sexe: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blood: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rhesus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthplace: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.STRING,
      allowNull: false,
    }, city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emergency_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emergency_contact: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    etat_civil: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profession: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    working: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    divers: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cs_creator_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cs_last_update_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

module.exports = { definePatientModel };
