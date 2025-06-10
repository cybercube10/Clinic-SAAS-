const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/db");
const Clinic = require("./clinicSchema");
const User = require("./userSchema"); 

const Employee = sequelize.define("Employee", {
  employee_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users", 
      key: "user_id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",

  },

  clinic_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Clinic,
      key: "clinic_id",
    },
    onDelete: "CASCADE",
  },
  

  role: {
    type: DataTypes.ENUM("admin", "doctor", "staff"),
    allowNull: false,
  },

 

  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },

  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },

  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "Employees",
  timestamps: false,
});

Clinic.hasMany(Employee, { foreignKey: "clinic_id", onDelete: "CASCADE" });
Employee.belongsTo(Clinic, { foreignKey: "clinic_id" });

User.hasOne(Employee, { foreignKey: "user_id", onDelete: "CASCADE" });
Employee.belongsTo(User, { foreignKey: "user_id" });

module.exports = Employee;
