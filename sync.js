const { sequelize } = require("./config/db");

const Clinic = require("./schema/clinicSchema");
const User = require("./schema/userSchema");
const Employee = require("./schema/employeeSchema");

Clinic.hasMany(User, { foreignKey: "clinic_id", onDelete: "SET NULL" });
User.belongsTo(Clinic, { foreignKey: "clinic_id" });

(async () => {
  try {
    await sequelize.sync({ alter: true }); 
    console.log("Database synced successfully!");
  } catch (error) {
    console.error(" Error syncing database:", error);
  } finally {
    await sequelize.close(); 
  }
})();
