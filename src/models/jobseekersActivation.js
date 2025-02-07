const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");

const JobseekersActivations = sequelize.define("JobseekersActivations", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  jobseeker_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  is_email_confirmed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  is_mernis_valid: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  tableName: "jobseekers_activations",
  timestamps: false,
});

module.exports = JobseekersActivations;