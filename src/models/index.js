const sequelize = require("../config/dbConnect");
const Users = require("./user");
const Jobseekers = require("./jobseeker");
const CurriculaVitaes = require("./curriculaVitae");
const Educations = require("./education");
const JobExperiences = require("./jobExperience");
const JobseekerLanguages = require("./jobseekerLanguage");
const Languages = require("./language");
const SocialMedias = require("./socialMedia");
const Employers = require("./employer");
const JobAdverts = require("./jobAdvert");
const Departments = require("./department");
const Schools = require("./school");

// Define associations
Users.hasOne(Jobseekers, { foreignKey: 'user_id' });
Jobseekers.belongsTo(Users, { foreignKey: 'user_id' });

Users.hasOne(Employers, { foreignKey: 'user_id' });
Employers.belongsTo(Users, { foreignKey: 'user_id' });


Jobseekers.hasMany(CurriculaVitaes, { foreignKey: "jobseeker_id" });
CurriculaVitaes.belongsTo(Jobseekers, { foreignKey: "jobseeker_id" });

CurriculaVitaes.hasMany(Educations, { foreignKey: "curricula_vitae_id" });
Educations.belongsTo(CurriculaVitaes, { foreignKey: "curricula_vitae_id" });

CurriculaVitaes.hasMany(JobExperiences, { foreignKey: "curricula_vitae_id" });
JobExperiences.belongsTo(CurriculaVitaes, { foreignKey: "curricula_vitae_id" });

CurriculaVitaes.hasMany(JobseekerLanguages, { foreignKey: "curricula_vitae_id" });
JobseekerLanguages.belongsTo(CurriculaVitaes, { foreignKey: "curricula_vitae_id" });

JobseekerLanguages.belongsTo(Languages, { foreignKey: "language_id" });

CurriculaVitaes.belongsTo(SocialMedias, { foreignKey: "social_media_id" });

Employers.hasMany(JobAdverts, { foreignKey: "employer_id" });
JobAdverts.belongsTo(Employers, { foreignKey: "employer_id" });

Educations.belongsTo(Departments, { foreignKey: "department_id" });
Educations.belongsTo(Schools, { foreignKey: "school_id" });

module.exports = {
  sequelize,
  Users,
  Jobseekers,
  CurriculaVitaes,
  Educations,
  JobExperiences,
  JobseekerLanguages,
  Languages,
  SocialMedias,
  Employers,
  JobAdverts,
  Departments,
  Schools,
};