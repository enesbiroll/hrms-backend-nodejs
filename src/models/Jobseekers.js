const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");
const Applications = require("./Applications");  // Applications modelini dahil ettik
const CurriculaVitaes = require("./CurriculaVitaes");  // CurriculaVitaes modelini dahil ettik
const JobExperiences = require("./JobExperiences");  // JobExperiences modelini dahil ettik
const JobseekerLanguages = require("./JobseekerLanguages");  // JobseekerLanguages modelini dahil ettik

const Jobseekers = sequelize.define("Jobseekers", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
  first_name: {
    type: DataTypes.STRING(35),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(35),
    allowNull: false,
  },
  identity_number: {
    type: DataTypes.STRING(11),
    allowNull: false,
    unique: true,
  },
  birth_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  race: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
}, {
  tableName: "jobseekers",
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['identity_number']
    }
  ]
});

// Cascade delete: Jobseekers ile ilişkili tüm modellerde veriler silinsin
Jobseekers.hasMany(Applications, { foreignKey: "jobseeker_id", onDelete: 'CASCADE' });
Jobseekers.hasMany(CurriculaVitaes, { foreignKey: "jobseeker_id", onDelete: 'CASCADE' });
Jobseekers.hasMany(JobExperiences, { foreignKey: "jobseeker_id", onDelete: 'CASCADE' });
Jobseekers.hasMany(JobseekerLanguages, { foreignKey: "jobseeker_id", onDelete: 'CASCADE' });

Applications.belongsTo(Jobseekers, { foreignKey: "jobseeker_id" });
CurriculaVitaes.belongsTo(Jobseekers, { foreignKey: "jobseeker_id" });
JobExperiences.belongsTo(Jobseekers, { foreignKey: "jobseeker_id" });
JobseekerLanguages.belongsTo(Jobseekers, { foreignKey: "jobseeker_id" });

module.exports = Jobseekers;
