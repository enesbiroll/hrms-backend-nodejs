const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");

const Educations = sequelize.define(
  "Educations",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    curricula_vitae_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    school_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "educations",
    timestamps: false,
  }
);

module.exports = Educations;
