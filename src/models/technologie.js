const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");

const Technologies = sequelize.define("Technologies", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  curricula_vitae_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  technologies: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
}, {
  tableName: "technologies",
  timestamps: false,
});

module.exports = Technologies;