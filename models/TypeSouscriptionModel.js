const { DataTypes } = require("sequelize");

const defineTypeSouscripteurModel = (sequelize) =>
  sequelize.define("TypeSouscriptions", {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      // POSSIBLE VALUE('BASIC', "ULTRA", "MOYEN"),
      defaultValue: "BASIC",
      allowNull: false,
    },
    sub_account_number: {
      // POSSIBLE VALUE("100", "500", "1000"),
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "10"
    },
  });

module.exports = { defineTypeSouscripteurModel };