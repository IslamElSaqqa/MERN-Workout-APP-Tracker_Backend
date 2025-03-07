const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// Create Token function
const createToken = (_id) => { 
    return jwt.sign({ _id }, process.env.SECRET, {expiresIn: '3d'})
}

// Login and Signup functions
const loginUser = async (req, res) => { 
    res.json({mssg: 'User login'})
}

const SignUpUser = async (req, res) => { 
    const { email, password } = req.body
    try {
        const user = await User.signUp(email, password)
        const Token = createToken(user._id)
        res.status(200).json({email, Token})
    } catch (err) { 
        res.status(400).json({error: err.message})
    }
}
// Export functions
module.exports = {loginUser, SignUpUser}