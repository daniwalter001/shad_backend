const { DataTypes } = require("sequelize");

const defineBookModel = (sequelize) =>
  sequelize.define("Book", {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    edition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    offsale: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ebook: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  });

module.exports = { defineBookModel };
