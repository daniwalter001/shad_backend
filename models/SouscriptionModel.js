const { DataTypes } = require("sequelize");

const defineSouscriptionModel = (sequelize) =>
  sequelize.define("Souscriptions", {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    status: {
      // POSSIBLE VALUE("pending", "active", "blocked"),
      type: DataTypes.STRING,
      defaultValue: "PENDING",
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
    souscription_type_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activationDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    
  });

module.exports = { defineSouscriptionModel };
