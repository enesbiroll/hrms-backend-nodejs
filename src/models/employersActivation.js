const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");

const EmployersActivations = sequelize.define(
  "EmployersActivations",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    employer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_email_confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    is_employer_activated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "employers_activations",
    timestamps: false,
  }
);

module.exports = EmployersActivations;
