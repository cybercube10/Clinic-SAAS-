const supabase = require('../supabase')
const Clinic = require('../schema/clinicSchema')
const Employee = require('../schema/employeeSchema')
const User = require('../schema/userSchema')

const upgradeUser = async (req, res) => {
    try {
      const { email } = req.body;
      const existingUser = await User.findOne({ where: { email } });
  
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      existingUser.role = "admin";
      await existingUser.save();
  
      res.status(200).json({ message: "User upgraded to admin", user: existingUser });
    } catch (error) {
      console.error("Upgrade user error:", error);
      res.status(500).json({ err: 'Server error while upgrading user' });
    }
  };
  
  const registerClinic = async (req, res) => {
    try {
      console.log(req.body,"this is it");
      
      const { name, address, phone, adminEmail } = req.body;

  
      let imageUrl = '';
      const imageFile = req.file;
  
      if(imageFile)
  
     { const { data, error } = await supabase.storage
        .from("clinic-saas")
        .upload(`clinics/${Date.now()}-${imageFile.originalname}`, imageFile.buffer, {
          contentType: imageFile.mimetype,
        });
  
      if (error) {
        console.error("Supabase Upload Error:", error);
        return res.status(500).json({ message: "Image upload failed", error });
      }
  
      const { data: publicUrlData } = supabase.storage.from("clinic-saas").getPublicUrl(data.path);
      if (!publicUrlData) {
        return res.status(500).json({ message: "Failed to retrieve image URL" });
      }
  
       imageUrl = publicUrlData.publicUrl;   }
      const clinic = await Clinic.create({
        name,
        address,
        phone,
        image: imageUrl || null,
      });
  
      const adminUser = await User.findOne({ where: { email: adminEmail } });
  
      if (!adminUser) {
        return res.status(404).json({ message: "Admin user not found" });
      }

      adminUser.role = "admin";
      await adminUser.save();

  
      await Employee.create({
        user_id: adminUser.user_id,
        clinic_id: clinic.clinic_id,
        role: "admin",
      });
  
      return res.status(201).json({
        message: "Clinic registered successfully! You are now an admin.",
        clinic,
      });
    } catch (error) {
      console.error("Error registering clinic:", error);
      return res.status(500).json({ message: error.message });
    }
  };
  

module.exports = {upgradeUser,registerClinic}

