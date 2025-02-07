const sequelize = require("../config/dbConnect");
const Jobseekers = require("./jobseeker");
const CurriculaVitaes = require("./curriculaVitae");
const Educations = require("./education");
const JobExperiences = require("./jobExperience");
const JobseekerLanguages = require("./jobseekerLanguage");
const Languages = require("./language");
const SocialMedias = require("./socialMedia");

// İlişkileri tanımla
Jobseekers.hasMany(CurriculaVitaes, { foreignKey: "jobseeker_id" });
CurriculaVitaes.belongsTo(Jobseekers, { foreignKey: "jobseeker_id" });

CurriculaVitaes.hasMany(Educations, { foreignKey: "curricula_vitae_id" });
Educations.belongsTo(CurriculaVitaes, { foreignKey: "curricula_vitae_id" });

CurriculaVitaes.hasMany(JobExperiences, { foreignKey: "curricula_vitae_id" });
JobExperiences.belongsTo(CurriculaVitaes, { foreignKey: "curricula_vitae_id" });

CurriculaVitaes.hasMany(JobseekerLanguages, {
  foreignKey: "curricula_vitae_id",
});
JobseekerLanguages.belongsTo(CurriculaVitaes, {
  foreignKey: "curricula_vitae_id",
});

JobseekerLanguages.belongsTo(Languages, { foreignKey: "language_id" });

CurriculaVitaes.belongsTo(SocialMedias, { foreignKey: "social_media_id" });

module.exports = {
  sequelize,
  Jobseekers,
  CurriculaVitaes,
  Educations,
  JobExperiences,
  JobseekerLanguages,
  Languages,
  SocialMedias,
};
