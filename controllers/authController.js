const User = require("../schema/userSchema");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({ name, email, password: hashedPassword });

    return res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};



const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }


    const token = jwt.sign(
      { user_id: user.user_id, role: user.role, clinic_id: user.clinic_id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
        clinic_id: user.clinic_id,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const googleSignup = async(req, res)=>{
    try {
        const { name, email, googleLogin } = req.body;
    
        let user = await User.findOne({ where: { email } });
    
        if (!user) {
          user = await User.create({
            name,
            email,
            is_google_login: googleLogin, 
            password: null, 
          });
        }
    
        const token = jwt.sign(
          { user_id: user.user_id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );
    
        return res.status(200).json({
          message: "Google signup successful!",
          token,
          user,
        });
      } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
      }
}

const  findUser = async(req,res)=>{
  try {
    const email = req.query.email;
    const existingUser =  await User.findOne({ where: { email } })
    if(existingUser){
      res.status(200).json({existingUser})
  } 
  else{
    res.status(404).json({msg:'user not found '})
  }
}
  catch (error) {
    res.status(500).json({msg:error.message})
  }
 }

 const googleLogin = async(req,res)=>{
  try {
    const {email} = req.body
    let user = await User.findOne({ where: { email } });
    if(user.is_google_login){
      res.status(200).json({user})
    }
  } catch (error) {
    res.status(500).json({message:"server error"})

  }
}


module.exports = {register,login,googleSignup,findUser,googleLogin}


