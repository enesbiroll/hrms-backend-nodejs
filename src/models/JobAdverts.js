const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");

const JobAdverts = sequelize.define("JobAdverts", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  employer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "employers",
      key: "user_id",
    },
  },
  city_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "cities",
      key: "id",
    },
  },
  job_position_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "job_positions",
      key: "id",
    },
  },
  description: {
    type: DataTypes.STRING(2000),
    allowNull: false,
  },
  salary: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  position_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  airdate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  uptime: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  type_of_employment: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  is_confirmed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  tableName: "job_adverts",
  timestamps: false,
});

module.exports = JobAdverts;