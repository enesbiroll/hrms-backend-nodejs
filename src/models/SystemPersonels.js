const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");

const SystemPersonels = sequelize.define(
  "SystemPersonels",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(35),
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
    createdDate: {
      type: DataTypes.DATE,
    },
    updatedDate: {
      type: DataTypes.DATE,
    },
    banned: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: "system_personels",
    timestamps: false,
  }
);

module.exports = SystemPersonels;
