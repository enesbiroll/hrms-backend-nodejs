const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");

const Languages = sequelize.define("Languages", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  language_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  tableName: "languages",
  timestamps: false,
});

module.exports = Languages;