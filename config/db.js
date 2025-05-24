const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: false, 
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log(" MySQL Database connected successfully!");
  } catch (error) {
    console.error(" MySQL connection failed:", error.message);
    process.exit(1);
  }
}

module.exports = { sequelize, connectDB };
