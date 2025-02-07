const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");

const JobExperiences = sequelize.define("JobExperiences", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  curricula_vitae_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  company_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  position_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
  },
}, {
  tableName: "job_experiences",
  timestamps: false,
});

module.exports = JobExperiences;