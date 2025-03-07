const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: {type: String, required: true}
})

userSchema.statics.signUp = async function (email, password){ 
    // Check for empty fields,Email,and Strong password using validator
    if (!email || !password)
        throw Error('All fields must be filled')
    if (!validator.isEmail(email))
        throw Error('Email is not valid')
    if (!validator.isStrongPassword(password))
        throw Error('Password is not strong Enough')
    
    // Check if email exists
    const emailExists = await this.findOne({ email })
    if (emailExists) throw Error('email is already in use!')
    
    // Default salt factor is 10 (No of rounds = 10)
    const salt = await bcrypt.genSalt(10)
    const password_hash = await bcrypt.hash(password, salt)
    
    // Create the collection
    const user = await this.create({email, password: password_hash})
    return user
}

// user login
userSchema.statics.login = async function (email, password) { 
    if (!email || !password)
        throw Error('All fields must be filled')
    // Find the email
    const user = await this.findOne({ email })
    if (!user) throw Error('Incorrect email')
    
    // Check password from database
    const passwordMatch = await bcrypt.compare(password, user.password) 
    
    // Check if not match
    if (!passwordMatch) throw Error('Incorrect Password')
    
    return user
}

// Export the model
module.exports = mongoose.model('User', userSchema)
