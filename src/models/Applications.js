const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");

const Applications = sequelize.define("Applications", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  jobseeker_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "jobseekers",
      key: "user_id",
    },
  },
  job_advert_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "job_adverts",
      key: "id",
    },
  },
  application_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: "applications",
  timestamps: false,
});

module.exports = Applications;