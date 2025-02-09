const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");

const CurriculaVitaes = sequelize.define("CurriculaVitaes", {
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
  social_media_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "social_medias",
      key: "id",
    },
  },
  picture_url: {
    type: DataTypes.STRING(100),
  },
  cover_letter: {
    type: DataTypes.STRING(200),
  },
}, {
  tableName: "curricula_vitaes",
  timestamps: false,
});

module.exports = CurriculaVitaes;