const CurriculaVitaes = require("./curriculaVitaes");
const Jobseekers = require("./jobseekers");
const SocialMedias = require("./socialMedias");
const Educations = require("./educations");
const Departments = require("./departments");
const Schools = require("./schools");
const Employers = require("./employers");
const EmployersActivations = require("./employersActivations");
const JobAdverts = require("./jobAdverts");
const Cities = require("./cities");
const JobPositions = require("./jobPositions");
const JobExperiences = require("./jobExperiences");
const JobseekerLanguages = require("./jobseekerLanguages");
const Languages = require("./languages");
const JobseekersActivations = require("./jobseekersActivations");
const SystemPersonels = require("./systemPersonels");
const Technologies = require("./technologies");
const Users = require("./users");

// Associations
CurriculaVitaes.belongsTo(Jobseekers, { foreignKey: "jobseeker_id" });
CurriculaVitaes.belongsTo(SocialMedias, { foreignKey: "social_media_id" });
Educations.belongsTo(CurriculaVitaes, { foreignKey: "curricula_vitae_id" });
Educations.belongsTo(Departments, { foreignKey: "department_id" });
Educations.belongsTo(Schools, { foreignKey: "school_id" });
Employers.belongsTo(Users, { foreignKey: "user_id" });
EmployersActivations.belongsTo(Employers, { foreignKey: "employer_id" });
JobAdverts.belongsTo(Cities, { foreignKey: "city_id" });
JobAdverts.belongsTo(Employers, { foreignKey: "employer_id" });
JobAdverts.belongsTo(JobPositions, { foreignKey: "job_position_id" });
JobExperiences.belongsTo(CurriculaVitaes, { foreignKey: "curricula_vitae_id" });
JobseekerLanguages.belongsTo(CurriculaVitaes, {
  foreignKey: "curricula_vitae_id",
});
JobseekerLanguages.belongsTo(Languages, { foreignKey: "language_id" });
Jobseekers.belongsTo(Users, { foreignKey: "user_id" });
JobseekersActivations.belongsTo(Jobseekers, { foreignKey: "jobseeker_id" });
SystemPersonels.belongsTo(Users, { foreignKey: "user_id" });
Technologies.belongsTo(CurriculaVitaes, { foreignKey: "curricula_vitae_id" });

module.exports = {
  CurriculaVitaes,
  Jobseekers,
  SocialMedias,
  Educations,
  Departments,
  Schools,
  Employers,
  EmployersActivations,
  JobAdverts,
  Cities,
  JobPositions,
  JobExperiences,
  JobseekerLanguages,
  Languages,
  JobseekersActivations,
  SystemPersonels,
  Technologies,
  Users,
};
