const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");

const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(320),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(25),
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
    tableName: "users",
    timestamps: false,
  }
);

module.exports = Users;
