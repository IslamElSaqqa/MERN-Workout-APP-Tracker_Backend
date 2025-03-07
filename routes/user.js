const express = require('express')
const router = express.Router()
const { loginUser, SignUpUser } = require('../controllers/userController')
// Login 
router.post('/login', loginUser)
// Sign up
router.post('/signup', SignUpUser)
module.exports = router
