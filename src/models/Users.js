const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");

const Users = sequelize.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(320),
    allowNull: false,
    unique: true,  // Email'in benzersiz olmasını sağlamak
  },
  password: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,  // Varsayılan değer olarak true, yani kullanıcı aktif olacak
  },
  createdDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,  // Varsayılan değer olarak şu anki tarih saat
  },
  updatedDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,  // Varsayılan değer olarak şu anki tarih saat
  },
  banned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,  // Varsayılan değer olarak false, yani kullanıcı yasaklanmamış
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,  // Varsayılan değer olarak false, yani kullanıcı silinmemiş
  },
}, {
  tableName: "users",
  timestamps: false,  // Timestamp'ların otomatik olarak oluşturulmasını istemiyoruz
});

module.exports = Users;