const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");
const Jobseekers = require("./jobseeker");

const CurriculaVitaes = sequelize.define(
  "CurriculaVitaes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    jobseeker_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    social_media_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    picture_url: {
      type: DataTypes.STRING(100),
    },
    cover_letter: {
      type: DataTypes.STRING(200),
    },
  },
  {
    tableName: "curricula_vitaes",
    timestamps: false,
  }
);

// İlişkiyi tanımla
CurriculaVitaes.belongsTo(Jobseekers, { foreignKey: "jobseeker_id" });

module.exports = CurriculaVitaes;
