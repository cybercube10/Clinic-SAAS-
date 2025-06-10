const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const Clinic = sequelize.define(
  "Clinic",
  {
    clinic_id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4, 
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Clinics",
    timestamps: false,
  }
);

module.exports = Clinic;
