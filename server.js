
require('dotenv').config()
const express = require('express')
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user')
const mongoose = require("mongoose");
// initate express app
const app = express();

// adding the middleware
app.use(express.json()) // Parsing the express incomings in json format
app.use((req, res, next) => { 
    console.log(req.path, req.method)
    next();
}) 
// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user',userRoutes)

// MongoDb Connection using the URI and the listening Port
mongoose.connect(process.env.MONGO_URI)
    .then(() => { // Connection Established
        // listen
        app.listen(process.env.PORT, () => {
            console.log("Connected to database...\nlistening to port:", process.env.PORT);
        });
    }).catch(err => { // Connection failed
        console.log(err);
    });
