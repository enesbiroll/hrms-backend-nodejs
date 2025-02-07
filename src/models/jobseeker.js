const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");

const Jobseekers = sequelize.define("Jobseekers", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING(35),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(35),
    allowNull: false,
  },
  identity_number: {
    type: DataTypes.STRING(11),
    allowNull: false,
  },
  birth_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: "jobseekers",
  timestamps: false,
});

module.exports = Jobseekers;