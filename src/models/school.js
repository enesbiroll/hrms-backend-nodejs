const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");

const Schools = sequelize.define(
  "Schools",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    school_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "schools",
    timestamps: false,
  }
);

module.exports = Schools;
