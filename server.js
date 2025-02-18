require('dotenv').config()
const express = require('express')

// initate express app
const app = express();

// adding the middleware
app.use((req, res, next) => { 
    console.log(req.path, req.method)
    next();
}) 
// routes
app.get('/', (req,res) => {
    res.json({ mssg: "Welcome to the App!" })
});
// listen
app.listen(process.env.PORT, () => {
    console.log ("listening to port: ", process.env.PORT);
});