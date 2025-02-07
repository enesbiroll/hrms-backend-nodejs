const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");

const JobseekerLanguages = sequelize.define("JobseekerLanguages", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  curricula_vitae_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  language_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  language_degree: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "jobseeker_languages",
  timestamps: false,
});

module.exports = JobseekerLanguages;