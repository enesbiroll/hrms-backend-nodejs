const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");

const Departments = sequelize.define(
  "Departments",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    department_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "departments",
    timestamps: false,
  }
);

module.exports = Departments;
