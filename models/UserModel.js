const { DataTypes } = require("sequelize");

const defineUserModel = (sequelize) =>
  sequelize.define("Users", {
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
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specialite: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    souscripteur_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cs_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    connected: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

module.exports = { defineUserModel };