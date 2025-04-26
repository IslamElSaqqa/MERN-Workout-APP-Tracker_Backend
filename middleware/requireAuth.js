const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const requireAuth = async (req, res, next) =>{

    const { authorization } = req.headers
    
    if (!authorization) 
        return res.status(401).json({error: 'Authorization token is required'})

    const token = authorization.split(' ')[1]

    try{
        // Grab the id and find the document with that id
        const { _id } = jwt.verify(token, process.env.SECRET)
        req.user = await User.findById( _id).select('_id')
        if (!req.user) {
            return res.status(401).json({ error: 'User not found' });
        }
        next()
    } catch (error) {
        console.error('JWT Verification Error:', error.message);
        res.status(401).json({error: 'Request is not authorized'})
    }
}
module.exports = requireAuth