const { DataTypes } = require("sequelize");

const defineSharedFileModel = (sequelize) =>
    sequelize.define("SharedFiles", {
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        sender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        receiver: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        visible: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    });

module.exports = { defineSharedFileModel };
