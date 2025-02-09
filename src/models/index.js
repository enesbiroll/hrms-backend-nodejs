// models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../config/dbConnect');
const associations = require('./associations');  // associations dosyasını buraya dahil et

// Modelleri içeri aktar
const { Users, Jobseekers, Applications, JobAdverts, Cities, JobPositions, Employers, JobExperiences, CurriculaVitaes, SocialMedias, Languages, Schools, Departments, Educations, EmployersActivations, JobseekerLanguages, Technologies, SystemPersonels } = associations;

// İlişkileri kur
sequelize.sync({ alter: true });  // Veritabanı yapısını senkronize eder

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