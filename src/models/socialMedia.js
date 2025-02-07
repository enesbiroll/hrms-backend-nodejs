const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");

const SocialMedias = sequelize.define(
  "SocialMedias",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    github_username: {
      type: DataTypes.STRING(100),
    },
    linkedin_username: {
      type: DataTypes.STRING(100),
    },
  },
  {
    tableName: "social_medias",
    timestamps: false,
  }
);

module.exports = SocialMedias;
