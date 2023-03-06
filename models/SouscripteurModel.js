const { DataTypes } = require("sequelize");

const defineSouscripteurModel = (sequelize) =>
  sequelize.define("Souscripteurs", {
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
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // city: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
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
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    connected: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

module.exports = { defineSouscripteurModel };
