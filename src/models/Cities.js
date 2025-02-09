const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");

const Cities = sequelize.define("Cities", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  city_name: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: "cities",
  timestamps: false,
});

module.exports = Cities;