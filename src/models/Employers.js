const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");

const Employers = sequelize.define("Employers", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
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
    defaultValue: true,
  },
}, {
  tableName: "employers",
  timestamps: false,
});

module.exports = Employers;