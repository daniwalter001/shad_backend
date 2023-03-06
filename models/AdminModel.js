const { DataTypes } = require("sequelize");

const defineAdminModel = (sequelize) =>
  sequelize.define("Admin", {
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
    connected: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

module.exports = { defineAdminModel };
