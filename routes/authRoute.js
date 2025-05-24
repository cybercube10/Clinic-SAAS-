const express = require('express')
const router = express.Router()
const {register,login,googleSignup,findUser,googleLogin} = require('../controllers/authController')


router.post('/register',register).post('/login',login).post('/create-user',googleSignup).post('/google-login',googleLogin)
router.get('/findUser',findUser)
module.exports = router

