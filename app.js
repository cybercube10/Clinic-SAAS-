const express = require("express");
const { connectDB, sequelize } = require("./config/db");

const User = require("./schema/userSchema");
const Clinic = require('./schema/clinicSchema')
const authRoutes = require('./routes/authRoute')
const clinicRoute = require('./routes/clinicRoute')
const cors = require('cors')
const multer = require('multer')


const upload = multer({
  storage: multer.memoryStorage() 
});

const app = express();

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use('/clinic', upload.single('image'), clinicRoute); 
app.use('/clinic/auth',authRoutes)
// app.use('/clinic',clinicRoute)


sequelize.sync({ alter: true })
  .then(() => console.log("MySQL tables synced"))
  .catch((err) => console.error(" Table sync error:", err));

app.listen(3000, () => {
  console.log(" Server running on port 3000");
});
