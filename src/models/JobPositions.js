const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");

const JobPositions = sequelize.define("JobPositions", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  job_title: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  tableName: "job_positions",
  timestamps: false,
});

module.exports = JobPositions;