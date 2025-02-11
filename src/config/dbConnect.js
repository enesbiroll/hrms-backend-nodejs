//#dbConnect.js
const { Sequelize } = require("sequelize");
const config = require("./database")[process.env.NODE_ENV || "development"];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: "127.0.0.1",
    dialect: "postgresql",
    // logging: false
  }
);

module.exports = sequelize;
