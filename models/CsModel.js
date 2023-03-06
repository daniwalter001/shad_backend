const { DataTypes } = require("sequelize");

const defineCsModel = (sequelize) =>
  sequelize.define("Cs", {
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
    designation: {
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    logo_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    authorisation_file_slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorisation_file_link: {
      type: DataTypes.STRING,
      allowNull: false,
    }

  });

module.exports = { defineCsModel };
