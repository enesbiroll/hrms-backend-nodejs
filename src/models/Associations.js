const Users = require("./Users");
const Jobseekers = require("./Jobseekers");
const Applications = require("./Applications");
const JobAdverts = require("./JobAdverts");
const Cities = require("./Cities");
const JobPositions = require("./JobPositions");
const Employers = require("./Employers");
const JobExperiences = require("./JobExperiences");
const CurriculaVitaes = require("./CurriculaVitaes");
const SocialMedias = require("./SocialMedias");
const Languages = require("./Languages");
const Schools = require("./Schools");
const Departments = require("./Departments");
const Educations = require("./Educations");
const EmployersActivations = require("./EmployersActivations");
const JobseekerLanguages = require("./JobseekerLanguages");
const Technologies = require("./Technologies");
const SystemPersonels = require("./SystemPersonels");
const JobseekersActivations = require("./JobseekersActivations"); 
const Employer = require("./Employers");

// Users ve Jobseekers arasında ilişki (Cascade delete)
Users.hasOne(Jobseekers, { foreignKey: "user_id", onDelete: 'CASCADE' });
Jobseekers.belongsTo(Users, { foreignKey: "user_id" });

Users.hasOne(Employer, { foreignKey: "user_id" });  // User ile Employer arasında ilişki
Employer.belongsTo(Users, { foreignKey: "user_id" });

// Jobseekers ve Applications arasında ilişki kurma (Cascade delete)
Jobseekers.hasMany(Applications, { foreignKey: "jobseeker_id", onDelete: 'CASCADE' });
Applications.belongsTo(Jobseekers, { foreignKey: "jobseeker_id" });

// Users ve Jobseekers arasında ilişki
Users.hasOne(Jobseekers, { foreignKey: "user_id" });
Jobseekers.belongsTo(Users, { foreignKey: "user_id" });

// Applications ve Jobseekers arasında ilişki
Applications.belongsTo(Jobseekers, { foreignKey: "jobseeker_id" });
Jobseekers.hasMany(Applications, { foreignKey: "jobseeker_id" });

// Applications ve JobAdverts arasında ilişki
Applications.belongsTo(JobAdverts, { foreignKey: "job_advert_id" });
JobAdverts.hasMany(Applications, { foreignKey: "job_advert_id" });

// JobAdverts ve Cities arasında ilişki
JobAdverts.belongsTo(Cities, { foreignKey: "city_id" });
Cities.hasMany(JobAdverts, { foreignKey: "city_id" });

// JobAdverts ve Employers arasında ilişki
JobAdverts.belongsTo(Employers, { foreignKey: "employer_id" });
Employers.hasMany(JobAdverts, { foreignKey: "employer_id" });

// JobAdverts ve JobPositions arasında ilişki
JobAdverts.belongsTo(JobPositions, { foreignKey: "job_position_id" });
JobPositions.hasMany(JobAdverts, { foreignKey: "job_position_id" });

// CurriculaVitaes ve Jobseekers arasında ilişki
CurriculaVitaes.belongsTo(Jobseekers, { foreignKey: "jobseeker_id" });
Jobseekers.hasMany(CurriculaVitaes, { foreignKey: "jobseeker_id" });

// CurriculaVitaes ve JobExperiences arasında ilişki
CurriculaVitaes.hasMany(JobExperiences, { foreignKey: "curricula_vitae_id" });
JobExperiences.belongsTo(CurriculaVitaes, { foreignKey: "curricula_vitae_id" });

// CurriculaVitaes ve SocialMedias arasında ilişki
CurriculaVitaes.belongsTo(SocialMedias, { foreignKey: "social_media_id" });
SocialMedias.hasOne(CurriculaVitaes, { foreignKey: "social_media_id" });

// JobseekerLanguages ve CurriculaVitaes arasında ilişki
JobseekerLanguages.belongsTo(CurriculaVitaes, { foreignKey: "curricula_vitae_id" });
CurriculaVitaes.hasMany(JobseekerLanguages, { foreignKey: "curricula_vitae_id" });

// JobseekerLanguages ve Languages arasında ilişki
JobseekerLanguages.belongsTo(Languages, { foreignKey: "language_id" });
Languages.hasMany(JobseekerLanguages, { foreignKey: "language_id" });

// Educations ve CurriculaVitaes arasında ilişki
Educations.belongsTo(CurriculaVitaes, { foreignKey: "curricula_vitae_id" });
CurriculaVitaes.hasMany(Educations, { foreignKey: "curricula_vitae_id" });

// Educations ve Schools arasında ilişki
Educations.belongsTo(Schools, { foreignKey: "school_id" });
Schools.hasMany(Educations, { foreignKey: "school_id" });

// Educations ve Departments arasında ilişki
Educations.belongsTo(Departments, { foreignKey: "department_id" });
Departments.hasMany(Educations, { foreignKey: "department_id" });

// Employers ve EmployersActivations arasında ilişki
Employers.hasOne(EmployersActivations, { foreignKey: "employer_id" });
EmployersActivations.belongsTo(Employers, { foreignKey: "employer_id" });

// CurriculaVitaes ve Technologies arasında ilişki
CurriculaVitaes.hasMany(Technologies, { foreignKey: "curricula_vitae_id" });
Technologies.belongsTo(CurriculaVitaes, { foreignKey: "curricula_vitae_id" });

// Jobseekers ve JobseekersActivations arasında ilişki
Jobseekers.hasOne(JobseekersActivations, { foreignKey: "jobseeker_id" });
JobseekersActivations.belongsTo(Jobseekers, { foreignKey: "jobseeker_id" });

// İlişkiler
Jobseekers.hasOne(JobseekersActivations, { foreignKey: "jobseeker_id" });
JobseekersActivations.belongsTo(Jobseekers, { foreignKey: "jobseeker_id" });

// SystemPersonels ve Users arasında ilişki
SystemPersonels.belongsTo(Users, { foreignKey: "user_id" });
Users.hasOne(SystemPersonels, { foreignKey: "user_id" });

module.exports = {
  Users,
  Jobseekers,
  Applications,
  JobAdverts,
  Cities,
  JobPositions,
  Employers,
  JobExperiences,
  CurriculaVitaes,
  SocialMedias,
  Languages,
  Schools,
  Departments,
  Educations,
  EmployersActivations,
  JobseekerLanguages,
  Technologies,
  SystemPersonels,
};
