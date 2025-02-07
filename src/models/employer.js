const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");

const Employers = sequelize.define("Employers", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  company_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  website: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING(12),
    allowNull: false,
  },
  picture_url: {
    type: DataTypes.STRING(100),
  },
  isActive: {
    type: DataTypes.BOOLEAN,
  },
}, {
  tableName: "employers",
  timestamps: false,
});

module.exports = Employers;